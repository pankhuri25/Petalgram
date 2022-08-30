const Post = require('../models/post');
const User = require('../models/user');

// render home page

// // // Normal rendering where posts are being passed on containing content and user reference ID.

// module.exports.home = function(req, res){
//     Post.find({}, (err, posts)=>{
//         return res.render('home',  {
//             title: 'Petalgram Home',
//             posts: posts
//         });
//     });
// }

// Pre-populating the referred object:
// We have stored User ID inside posts DB. But we dont want to show ID on the posts, instead, we want to show USER's name (the one who posted). 
// So, we will pre-populate/fetch the User's complete info from User DB/schema, not just the ID.
// Conveniently, we will only show that part of info that we want to display.

// Using Populate Function:

module.exports.homeTemp = function(req, res){

    // populate the user of each post found in the DB.
    // exec is used to accomodate the callback function, 
    // which we were directly writing within find method 
    // but since the query got long due to populate method, 
    // we have to write it in exec method
    Post.find({})
    // populate the user of post
    .populate('user')
    // populate the comments on post and the users who made the comment
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        // find Users to display the list of users on home page
        User.find({}, function(err, users){
            return res.render('home',  {
                title: 'Petalgram Home',
                posts: posts,
                all_users: users
            });
        });
    });
}

// The above way of writing the code is chaining the callback functions (callback hell)

// 2nd way using then method:
// example:
// Post.find().populate('comments').then(function(){});

// 3rd way is by using promises:
// example:
// let posts = Post.find().populate('comments').exec(function(){});
// posts.then();

// 4th way by using async await (to avoid callback hell and function chaining):
module.exports.home = async function(req, res){
    try{
        // populate the posts found in the DB.
        let posts = await Post.find({})
        // populate the user of post
        .populate('user')
        // populate the comments on post and the users who made the comment
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        
        // find Users to display the list of users on home page
        let users = await User.find({});
        
        return res.render('home',  {
            title: 'Petalgram Home',
            posts: posts,
            all_users: users
        });    
    }
    catch(err){
        console.log("Error: ", err);
        return;
    }
}


