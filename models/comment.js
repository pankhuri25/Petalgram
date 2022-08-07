const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belongs to a user, so reference to the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // comments are found on posts, so reference to the post on which the comment is made
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
        timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;