const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.login);

// create a user in DB using sign-up data
router.post('/create', usersController.create);

// use passport as a middleware to authenticate
// three arguments:
// 1. URL (where to post/get?)
// 2. middleware (passport authentication)
// 3. call method present in the controller for further functioning
router.post('/create-session', passport.authenticate(
    'local', // first argument: strategy name
    {failureRedirect: '/users/login'} // if the session fails to get created, then redirect back to login portal (it gets the done variable's status here)
) , usersController.createSession);

module.exports = router;
