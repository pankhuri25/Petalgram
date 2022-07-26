const User = require('../models/user');

// render the User Profile after Logging In
module.exports.profile = function(req, res){

    console.log(req.cookies); //// to check what all cookies are present
    
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, (err, user)=>{
            if(err){
                console.log('Error fetching the User from DB:', err);
                return;
            }
            if(user){
                return res.render('user_profile',  {
                    title: 'User Profile',
                    // user: user
                    // OR:
                    name: user.name,
                    email: user.email
                });
            }
            return res.redirect('/users/login');
        });
    }
    /// removing else didn't work: (gave error: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)
    // because Javascript callbacks are asynchronous and hence the return statement was getting executed even before the rendering part. Use async await to optimize it.
    // For now, use else to prevent return execution.
    else
        return res.redirect('/users/login');
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
// get the sign up data
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

    // Find the user in DB
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err){
            console.log('Error in finding User');
            return;
        }

        // Handle user found 
        if(user){
            // 1. Handle password mismatch condition, if any.
            if(user.password!=req.body.password){
                console.log('Password did not match. Please login with correct password!');
                return res.redirect('/users/login');
            }
            // 2. If matched, Create Session
            res.cookie('user_id', user.id);  //coming from DB (_id)
            return res.redirect('/users/profile');
        }
        // Handle user not found
        // 1. Incorrect Username
        // 2. Otherwise, redirect to Signup for new user creation
        else{
            return res.redirect('/users/sign-up');
        } 
    });
}