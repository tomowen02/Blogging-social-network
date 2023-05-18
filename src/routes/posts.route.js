const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('posts/posts')
});

module.exports = router;