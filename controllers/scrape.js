const TAG = "controllers.scrape";
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { traceLog, successLog, failedLog } = require("../helpers/logger");

exports.main = async (req, res) => {
    traceLog(`${TAG} >> main`);
    
    const url = 'https://www.tokopedia.com/p/handphone-tablet/handphone';
    
    axios(url).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const parentDiv = $('div.css-13l3l78.e1nlzfl10 > div');
        const result = [];
    
        parentDiv.each(function () {
            result.push({
                product: $(this).find('a > div.css-16vw0vn > div.css-11s9vse > span').text(), 
                description: $(this).find('a > div.css-16vw0vn > div.css-11s9vse span.css-1kr22w3:first-child').text(),
                image_link: $(this).find('a > div.css-16vw0vn').find('img').attr('src'),
                price: $(this).find('a > div.css-16vw0vn > div.css-11s9vse span.css-o5uqvq').text(),
                rating: $(this).find('a > div.css-16vw0vn > div.css-11s9vse > div.css-153qjw7 > div > img').length,
                store_name: $(this).find('a > div.css-16vw0vn > div.css-11s9vse span.css-1kr22w3:last-child').text()
            });
        });
    
        successLog(req, res, {
            status: true,
            message: 'Scraping data successful',
            result: result
        });
    }).catch(console.error);
}