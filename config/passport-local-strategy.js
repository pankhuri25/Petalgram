// import passport library
const passport = require('passport');

// Syntactically importing Local Strategy
const LocalStrategy =require('passport-local').Strategy;

const User = require('../models/user')


// Passport is using Local Strategy to find which User is signed in and then serializing (saving cookie in encrypted format using serializeUser method)
// authentication using passport
passport.use(new LocalStrategy({
        // setting unique username field as email for now
        usernameField: 'email'
    },
    // callback function with variables email and password because these two are in the schema 
    // (done variable is inbuilt in passport, it reports back to passport.js)
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if (err){
                console.log('Error in finding User -> Passport');
                // done takes first argument for error
                return done(err);
            }
            // if user not found or password didn't match
            if(!user || user.password != password){
                console.log('Invalid Username/Password');

                // done takes two arguments here (first one: error, 2nd one: authentication done (false here))
                return done(null, false);
            }
            // null -> no error,  user: authentication succeeded (true), hence return full user
            return done(null, user);
        });
    }
));


// Serialize User function 
// (to decide which key is to be kept in cookies)

// Put in user id from browser into the cookie and not the rest of the info (bcoz that's the only thing required to be encrypted)
passport.serializeUser(function(user, done){
    done(null, user.id);  //null: no error, user.id: set user id in encrypted format in cookie
});



// Deserialize User function 
// (deserializing from the key present in the cookies)

// when the cookie is sent back to the server and the identity (User ID) of user is being established and verified
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding User');
            return done(err);
        }
        return done(null,user);
    });
});

module.exports = passport;