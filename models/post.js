const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // post is made by a user, so reference to the user ID here:
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // to fetch the comments made on a post, we will save the IDs of all the comments made
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;