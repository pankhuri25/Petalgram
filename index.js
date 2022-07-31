const express = require("express");
const port = 8081;
const app = express();
const db = require('./config/mongoose'); // installed using npm install mongoose
const users = require('./models/user');
const expressLayouts = require('express-ejs-layouts');  //installed using npm install express-ejs-layouts
const cookieParser = require('cookie-parser');  //installed using npm install cookie-parser

// used for converting scss/sass to system readable css
const sassMiddleware = require ('node-sass-middleware'); //installed using npm install node-sass-middleware

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// used for session cookie encryption
const session = require('express-session'); // installed using npm install express-session

// for authentication
const passport = require('passport'); // installed using npm install passport
const passportLocal = require('./config/passport-local-strategy'); // iinstalled using npm install passport-local

// Our session cookie gets reset everytime our server restarts (npm start)
// If a new code is deployed to the production server, all our users will be logged out
// Use persistent storage (to keep the cookies in the server)
// Hence, storein the Mongo DB
const MongoStore = require('connect-mongo');  // after requiring, it takes up session as the argument

// reading through POST requests (req.body)
// app.use(express.urlencoded());
app.use(express.urlencoded({extended: true}));

// when the request is coming, cookie needs to be parsed
app.use(cookieParser());

// static files(css, js, images)
app.use(express.static('./assets'));

// extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up view engine
app.set('view engine', 'ejs');  //installed using npm install ejs
app.set('views', './views');

// middleware that takes in the cookie and encrypts it
// mongo store is used to store the session cookie in the db
app.use(session({
    // name of the cookie
    name: 'Petalgram',
    // TODO change the secret before deployment to production
    // to encode cookie, we will use the secret 
    secret:'somethinggg',
    // when there is a request (session) which is not initialized, that means the user is not logged in and the identity has not been established, then we do not want to add extra data in the cookie, hence set to false
    saveUninitialized: false,
    // we dont want to save the session data again n again
    resave: false,
    // set cookie expiration time
    cookie: {
        // number of minutes the session will stay logged in before cookie expiration (logout)
        maxAge: (1000 * 60 * 100)
        // 1000 is to make the time in miliseconds
        // 60 is in seconds
        // 100 is in minutes
        // therefore, it totals to 60,00,000ms
    },
    store: MongoStore.create({
        // mongoose.connection is in the variable db (which got exported from mongoose config file)
        mongoUrl: "mongodb://localhost/users",
        autoRemove: 'disabled'
    },
    function(err){
        // either there is an error, or if not, then nothing should be shown (connect-mongodb setup ok)
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

// express app to use the passport
app.use(passport.initialize());

// passport also helps in maintaining express sessions
app.use(passport.session());

// when the passport session is being used, authenticated user is also being set
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running Server: ${err}`);
        return;
    }
    console.log(`Server up and running on Port: ${port}`);
});
