const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.addComment = function(req, res){

    // Find the post with the post id (coming from home.ejs) first and then create a comment after it
    // Also, add the comment ID to comment array inside post schema
    Post.findById(req.body.post, function(err, post){

        // if postt found:
        if(post) {
            Comment.create({
                content: req.body.content,
                user: req.user._id,  // coming from req.user saved in locals inside setAuthenticatedUser method written in passport local strategy config
                post: req.body.post  // coming from home.ejs where name=post was given
            }, (err, comment)=>{
                if(err){
                    console.log(`Error in adding comment: $(err)`);
                    return;
                }
                // saving comments inside post schema for the given post
                post.comments.push(comment);
                // saving final version of post model
                post.save();

                return res.redirect('back');
            });
        }
    });
}
