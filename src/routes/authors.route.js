const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('authors/authors')
});

router.get('/example', async (req, res) => {
    res.render('authors/individual')
});

module.exports = router;