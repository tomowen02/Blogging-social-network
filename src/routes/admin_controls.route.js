const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

router.get('/', async (req, res) => {
    res.render('admin_controls/admin_controls');
});
router.get('/categories', async (req, res) => {
    const categories = await Category.find();
    res.render('admin_controls/admin_controls', { subpage: "categories", categories: categories });
});

module.exports = router;