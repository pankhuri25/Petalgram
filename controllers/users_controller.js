const User = require('../models/user');

// render the User Profile after Logging In
module.exports.profile = function(req, res){
    // Display user profile according to the user id being querried
    User.findById(req.params.id, (err, user)=>{
        return res.render('user-profile',  {
            title: 'User Profile',
            profile_user: user
        });
    })
    
}

// Update user profile functionality
module.exports.update = function(req, res){
    // check if user is authorized to update info
    if (req.user.id == req.params.id){
        // User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email})
        // OR we can directly pass the whole req.body:
        User.findOneAndUpdate(req.params.id, {insert: true})
        User.findByIdAndUpdate(req.params.id ,req.body, (err, user)=>{
            return res.redirect('back');
        });
    }
    else {
        return res.status(401).send('Unauthorized');
    }
}

// render the Sign Up page
module.exports.signUp = function(req, res){

    //// to check cookies value (setup manually on browser by me)
    //// Open console (press F12 or Ctrl+Shift+i) -> Go to Application -> Under Storage, go to Cookies -> open the localhost page -> put in Name and Value
    // console.log(req.cookies);

    //// we can change the value of cookie from our code too:
    // res.cookie('user_id', '23');

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', {
        title: 'Petalgram Sign Up'
    });
}

// render the Login Page
module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_login', {
        title: 'Petalgram User Login'
    });
}
// get the sign up data and create user in DB
module.exports.create = function(req, res){
    // TODO
    if(req.body.password != req.body.confirm_password)
    {
        res.redirect('back');
    }

    User.findOne({email: req.body.email}, (err, user)=>{
        if(err){
            console.log('Error finding the user:', err);
        }
        if(!user){
            User.create(req.body, (err, user)=>{
                if(err){
                    console.log('Error in creating User', err);
                }
                return res.redirect('/users/login');
            });
        }
        else{
            console.log('User Already Exists!');
            return res.redirect('/users/login');
        }
    });
}

// login and create a session for the user
module.exports.createSession = function(req, res){
    
    // user is logged in and we just need to redirect to home page
    // session is created in passport.js itself.
    // no need to handle authentication manually here
    return res.redirect('/');
}

module.exports.destroySession = function(req,res, next) {
    
    // logout function (asynchronous) is provided by passport js
    // req.logout();
    // return res.redirect('/');
    req.logout(function(err) {
    if (err) {
        return next(err);
    }
    res.redirect('/');
    });
}
    
    

// // Manual LogOut Button

// module.exports.logOut = function(req, res){
//     if(req.cookies.user_id){
//         res.clearCookie("Petalgram");
//         return res.redirect('/users/login');
//     }
// }