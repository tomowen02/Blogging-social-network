const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

router.get('/', async (req, res) => {
    posts = await Post.find().sort({ date: 'desc' }).limit(3).populate('category author').exec();
    res.render('index', { posts: posts });
});

module.exports = router;