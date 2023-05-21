const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('posts/posts')
});

router.get('/new', async (req, res) => {
    res.render('posts/new')
});

module.exports = router;