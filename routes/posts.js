const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

// Applying 2 levels of check to prevent anonymous user penetration
// 1. Passport authentication
// 2. Not showing the form to submit a post
router.post('/create-post', passport.checkAuthentication, postsController.createPost);
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;