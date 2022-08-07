const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentsController = require('../controllers/comments_controller.js');

router.post('/add-comment', passport.checkAuthentication, commentsController.addComment);

module.exports = router;