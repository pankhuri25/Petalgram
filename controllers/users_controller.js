const User = require('../models/user');

// render the User Profile after Logging In
module.exports.profile = function(req, res){
    return res.render('user_profile',  {
        title: 'User Profile'
    });
}

// render the Sign Up page
module.exports.signUp = function(req, res){

    //// to check cookies value (setup manually on browser by me)
    //// Open console (press F12 or Ctrl+Shift+i) -> Go to Application -> Under Storage, go to Cookies -> open the localhost page -> put in Name and Value
    // console.log(req.cookies);

    //// we can change the value of cookie from our code too:
    // res.cookie('user_id', '23');

    return res.render('user_signup', {
        title: 'Petalgram Sign Up'
    });
}

// render the Login Page
module.exports.login = function(req, res){
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