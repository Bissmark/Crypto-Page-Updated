var express = require('express');
var router = express.Router();
const coinsController = require('../controllers/api/coins');
const usersController = require('../controllers/api/users');

/* GET home page. */
router.get('/coins', async(req, res) => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true', {
            headers: {
                'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/totalCoinInfo', async(req, res) => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/global', {
            headers: {
                'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${ id }?sparkline=true`, {
            headers: {
                'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/addFavourite', usersController.addFavourite);

router.post('/coins', coinsController.create);

module.exports = router;
