const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const Category = require('../models/category.model');
const { ensureAuthor } = require('../middleware/auth.middleware');

// GET METHODS
router.get('/', async (req, res) => {
    let query = Post.find().sort({ date: 'desc' });
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if (req.query.category != null && req.query.category != '') {
        query = query.where('category').equals(req.query.category);
    }
    if (req.query.category != null && req.query.category != '') {
        query = query.where('category').equals(req.query.category);
    }
    if (req.query.followingFilter == 'on') {
        query = query.find({ author: { $in: req.user.following }});
    }
    try {
        posts = await query.populate('category author').exec();
        //console.log(posts);
        categories = await Category.find();
        res.render('posts/posts', {
            posts: posts,
            categories: categories,
            searchOptions: req.query
        })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/new', ensureAuthor, async (req, res) => {
    const post = new Post();
    renderNewPostPage(res, post);
});

router.get('/post/:slug', async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author').exec();
    res.render('posts/individual', { post: post });
});


// POST METHODS
router.post('/', ensureAuthor, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        body: req.body.body,
        author: req.user._id
    });
    try {
        let newPost = await post.save();
        newPost = await Post.populate(newPost, {path: 'category author'});
        //res.redirect(`movies/${newMovie.id}`)
        res.redirect('posts'); // Is this correct?
    } catch (error) {
        console.log(error);
        renderNewPostPage(res, post, true);
    }
})


async function renderNewPostPage(res, post, hasError = false) {
    try {
        const categories = await Category.find({});
        const params = {
            post: post,
            categories: categories
        };
        if (hasError) { 
            params.errorMessage = 'Error creating post';
        }
        res.render('posts/new', params);
    } catch {
        res.redirect('posts');
    }
}



// Debugging routes
// router.get('/test-post', async (req, res) => {
//     const category = new Category({ name: 'Sport'});
//     await category.save()
//     // //category = await Category.findOne()
//     // const post = new Post({
//     //     title: "This is a title3",
//     //     body: "The body of the blog post is written here.",
//     //     slug: "forth-post",
//     //     category: category._id
//     // });
//     // let newPost = await post.save()
//     // newPost = await Post.findOne({'_id':newPost._id}).populate('category').exec();
//     // console.log(newPost);
//     // console.log(newPost.url);
//     //console.log(newPost.category.name);
//     res.redirect('posts/posts')
// });

// router.get('/test-del', async (req, res) => {
//     await Post.deleteMany({});
//     await Category.deleteMany({});
//     console.log("done");
//     res.redirect('/')
// });
// router.get('/test-del-posts', async (req, res) => {
//     await Post.deleteMany({});
//     console.log("done");
//     res.redirect('/')
// });

// router.get('/test-list', async (req, res) => {
//     console.log(await Post.find());
//     categories = await Category.find()
//     console.log(categories);
//     res.redirect('/')
// });

module.exports = router;