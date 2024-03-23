var express = require('express');
var router = express.Router();
const coinsController = require('../controllers/api/coins');

/* GET home page. */
router.post('/coins', coinsController.create);

module.exports = router;
