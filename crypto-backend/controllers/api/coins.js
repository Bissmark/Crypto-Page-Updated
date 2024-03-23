const Coin = require('../../models/coin');

const create = async (req, res) => {
    console.log('Hi');
    try {
        const coin = await Coin.create(req.body);
        res.json(coin);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = {
    create
};