const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

postSchema.virtual('url').get(function(){
    if (this.catName) {
        return '/post/' + this.catName;
    }
    throw "Category name not populated"
})
postSchema.virtual('catName', {
    ref: 'Category',
    localField: 'category',
    foreignField: '_id',
    justOne: true,
    // Customize the behavior to get the author's name
    get: function() {
      return this.category.name;
    }
  });

module.exports = mongoose.model('Post', postSchema); 