const Post = require('../models/post');
const User = require('../models/user');

module.exports.createPost = function(req, res){
    if(req.isAuthenticated()){
        console.log(req.body);
        Post.create({
            content: req.body.content,
            user: req.user._id  // coming from req.user saved in locals inside setAuthenticatedUser method written in passport local strategy config
        }, (err, post)=>{
            if(err){
                console.log(`Error in creating post: $(err)`);
                return;
            }
            return res.redirect('back');
        });
    }
    else{
        console.log("Please login to post!");
    }
}