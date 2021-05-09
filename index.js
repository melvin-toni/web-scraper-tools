const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');

// add the list of routes here
const scrapeRoutes = require('./routes/scrape');

let envPath = '.env.development'
env.config({
    debug: process.env.DEBUG,
    path: envPath
});

const app = express();
app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add the list of API's here
app.use('/api/scrape', scrapeRoutes);

app.listen(app.get('port'), () => {
    console.log('%s App is running at %s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
});

module.exports = app;