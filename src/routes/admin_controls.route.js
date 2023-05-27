const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('admin_controls/admin_controls');
});
router.get('/categories', async (req, res) => {
    res.render('admin_controls/admin_controls', { subpage: "categories" });
});

module.exports = router;