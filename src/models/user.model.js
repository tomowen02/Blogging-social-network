const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const userSchema = new mongoose.Schema({
    authInfo: {
        method: {
            type: String,
            trim: true,
            required: true
        },
        authID: {
            type: String,
            trim: true,
            required: true
        }
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    profileSlug: {
        type: String,
        slug: "name",
        unique: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isAuthor: {
        type: Boolean,
        default: false,
        required: true
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    authorBio: {
        type: String,
        trim: true
    },
})

userSchema.methods.isFollowing = function (userId) {
    return this.following.includes(userId);
};

module.exports = mongoose.model('User', userSchema); 