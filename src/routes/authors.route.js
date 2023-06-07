const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Post = require('../models/post.model');
const { ensureAuth } = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
    try {
        authors = await User.find({ isAuthor: true });
        //console.log(authors);
        res.render('authors/authors', { authors: authors });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const author = await User.findOne({ profileSlug: req.params.slug });
        const posts = await Post.find({ author: author._id }).populate('category author').exec();
        res.render('authors/individual', { author: author, posts: posts });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
    
});

router.put('/follow/:id', ensureAuth, async (req, res) => {
    try {
        const author = await User.findById(req.params.id);
        await User.updateOne({ _id: req.user.id }, { $addToSet: {following: author.id} });
        res.send(`Followed ${author.id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});
router.put('/unfollow/:id', ensureAuth, async (req, res) => {
    try {
        const author = await User.findById(req.params.id);
        await User.updateOne({ _id: req.user.id }, { $pull: {following: author.id} })
        res.send("Unfollowed")
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

module.exports = router;