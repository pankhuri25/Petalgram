// render the User Profile after Logging In
module.exports.profile = function(req, res){
    return res.render('user_profile',  {
        title: 'User Profile'
    });
}

// render the Sign Up page
module.exports.signUp = function(req, res){
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
}