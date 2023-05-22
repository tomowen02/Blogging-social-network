const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('admin_controls/test')
});

module.exports = router;