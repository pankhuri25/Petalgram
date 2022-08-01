const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controler');

router.post('/create-post', postsController.createPost);

module.exports = router;