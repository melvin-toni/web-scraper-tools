const routes = require('express').Router();
const controller = require('../controllers/scrape');

routes.post('/', controller.main);

module.exports = routes;