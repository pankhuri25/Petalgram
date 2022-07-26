const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.login);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.post('/log-out', usersController.logOut);
module.exports = router;
