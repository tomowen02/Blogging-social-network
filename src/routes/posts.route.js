const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('posts/posts')
});

router.get('/new', async (req, res) => {
    res.render('posts/new')
});

router.get('/individual-post', async (req, res) => {
    res.render('posts/display')
});

module.exports = router;