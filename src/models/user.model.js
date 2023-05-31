const mongoose = require('mongoose');

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
        trim: true,
        required: true
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
    }
})

module.exports = mongoose.model('User', userSchema); 