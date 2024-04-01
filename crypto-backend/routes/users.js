const express = require('express');
const router = express.Router();
const usersController = require('../controllers/api/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', usersController.create);
router.post('/login', usersController.login);
router.post('/addFavourite', usersController.addFavorite);
router.post('/removeFavourite', usersController.removeFavourite);
router.get('/favourites/:userId', usersController.getFavourites);

router.get('/check-token', ensureLoggedIn, usersController.checkToken);

module.exports = router;