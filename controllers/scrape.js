const TAG = "controllers.scrape";
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { parse } = require('json2csv');
const fs = require('fs');
const { traceLog, successLog, failedLog } = require("../helpers/logger");

exports.main = async (req, res) => {
    traceLog(`${TAG} >> main`);
    
    const url = 'https://www.tokopedia.com/p/handphone-tablet/handphone';
    
    dynamicScrolling(url).then((response) => {
        const $ = cheerio.load(response);
        const parentDiv = $('div.css-13l3l78.e1nlzfl10 > div');
        const result = [];
        console.log('TOTAL CHILD >>', parentDiv.length);
        parentDiv.each(function () {
            result.push({
                product_name: $(this).find('a > div.css-16vw0vn > div.css-11s9vse > span').text(), 
                description: $(this).find('a > div.css-16vw0vn > div.css-11s9vse span.css-1kr22w3:first-child').text(),
                image_link: $(this).find('a > div.css-16vw0vn').find('img').attr('src'),
                price: $(this).find('a > div.css-16vw0vn > div.css-11s9vse span.css-o5uqvq').text(),
                rating: $(this).find('a > div.css-16vw0vn > div.css-11s9vse > div.css-153qjw7 > div > img').length,
                store_name: $(this).find('a > div.css-16vw0vn > div.css-11s9vse span.css-1kr22w3:last-child').text()
            });
        });

        const fields = ['product_name', 'description', 'image_link', 'price', 'rating', 'store_name'];
        const opts = { fields };
        const csv = parse(result, opts);
        const filePath = './CSV/' + 'result.csv';
        fs.writeFileSync(filePath, csv);
    
        successLog(req, res, {
            status: true,
            message: 'Scraping data successful',
            result: result
        });
    }).catch((error) => {
        failedLog(req, res, {
            status: false, message: 'Scraping data failed', debug: error
        });
    });
}

function dynamicScrolling(url) {
    return new Promise((resolve, reject) => {

        async function autoScroll(page) {
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
        
                        if(totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }

        async function getData(url) {
            try{
                const browser = await puppeteer.launch({headless: false});
                const page = await browser.newPage();
                await page.goto(url);
                await page.setViewport({width: 1200, height: 800});
                await autoScroll(page);
                await page.waitForSelector('div.css-13l3l78.e1nlzfl10 > div', { 
                    visible: true, timeout: 1000
                });
                const pageContent = await page.content();
                await browser.close();
                return pageContent;
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const gd = getData(url);
            resolve(gd);
        } catch (error) {
            reject(error);
        }
    });
}