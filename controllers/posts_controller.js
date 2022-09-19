const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.createPostTemp = function(req, res){
    if(req.isAuthenticated()){
        // console.log(req.body);
        Post.create({
            content: req.body.content,
            user: req.user._id  // coming from req.user saved in locals inside setAuthenticatedUser method written in passport local strategy config
        }, (err, post)=>{
            if(err){
                // console.log(`Error in creating post: $(err)`);
                req.flash('error', err);
                return;
            }
            req.flash('success', 'Post published!');
            return res.redirect('back');
        });
    }
    else{
        console.log("Please login to post!");
    }
}

module.exports.createPost = async function(req, res){

    try{
        if(req.isAuthenticated()){
            console.log(req.body);
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id  // coming from req.user saved in locals inside setAuthenticatedUser method written in passport local strategy config
            });

            // check if request is an AJAX (xhr type) request:
            if(req.xhr){
                // if we want to populate just the name of the user,
                // (we'll not want to send the password in the API), this is how we do it!
                post = await post.populate('user');
                console.log("line 41.....");
                // return response in the form of status for json type data
                return res.status(200).json({
                    data: {
                        post : post,
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'Post published!');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Method to delete post
module.exports.destroyTemp = function(req, res){

    // Check if post exist, then perform deletion
    Post.findById(req.params.id, function(err, post){

        // Check if the user who is trying to delete, is authorized to delete or not
        // Match the DB-found post's user id with the user who is requesting to delete
        // post.user contains user id in string format
        // req.user._id is an object. To match strings, use req.user.id (it returns string)
        // .id is given my mongoose to convert object id into string
        // Making comparisons based on strings is the correct way (instead of comparing objects)
        if(post.user == req.user.id){
            post.remove();

            // deletes all comments based on given query
            Comment.deleteMany({post: req.params.id}, (err)=>{
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }

    });
}


// Writing the method in async await form:
module.exports.destroy = async function(req, res){

    try{
        // Check if post exist, then perform deletion
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){
            post.remove();

            // deletes all comments based on given query
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted!'
                });
            }

            req.flash('success', 'Post and the comments Deleted!');
            return res.redirect('back');
        }
        else {
            req.flash('error', 'You can not deleted this post!');
            return res.redirect('back');
        }
    }
    catch (err){
        // console.log("error: ", err);
        req.flash('error', err);
        return;
    }
}