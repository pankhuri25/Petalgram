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

// action to delete a comment
module.exports.destroy = function(req, res){

    // find if comment exists by checking if comment's id exists
    Comment.findById(req.params.id, function (err, comment){

        // check if comment's user matches the incoming id's user (commenter)
        if(comment.user == req.user.id){

            // before deleting the comment entirely, extract the Post's id on which the comment was made, because we have to remove this comment from Post schema's comments array 
            let postId = comment.post;
            // now, remove the comment from comment schema
            comment.remove();

            // now, find that post using postId and remove the comment from comment's array inside that particular post
            // $pull is a way of pulling out (removing) a given thing (comment id here) : mongoose provides this syntax
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, (err, post)=>{
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}