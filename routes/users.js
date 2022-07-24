const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.login);

module.exports = router;
