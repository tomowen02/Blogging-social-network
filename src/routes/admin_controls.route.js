const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

router.get('/', async (req, res) => {
    res.render('admin_controls/admin_controls');
});

router.get('/categories', async (req, res) => {
    const categories = await Category.find();
    res.render('admin_controls/admin_controls', { subPagePath: "categories/_categories", categories: categories });
});

router.get('/categories/new', async (req, res) => {
    res.render('admin_controls/categories/new');
});

// Post new category
router.post('/categories', async (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    try {
        await category.save();
        res.redirect('categories');
    } catch (error) {
        console.log(error);
        renderNewCategoryPage(res, category, true);
    }
})
async function renderNewCategoryPage(res, category, hasError = false) {
    try {
        const params = {
            category: category
        };
        if (hasError) { 
            params.errorMessage = 'Error creating category';
        }
        res.render('admin/categories/new', params);
    } catch {
        res.redirect('categories');
    }
}

module.exports = router;