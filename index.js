const express = require("express");
const port = 8081;
const app = express();
const db = require('./config/mongoose');
const users = require('./models/user');
const expressLayouts = require('express-ejs-layouts');  //installed using npm install express-ejs-layouts
const cookieParser = require('cookie-parser');  //installed using npm install cookie-parser

// used for session cookie encryption
const session = require('express-session');

// for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

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
app.use(session({
    // name of the cookie
    name: 'Petalgram',
    // TODO change the secret before deployment to production
    // to encode cookie, we will use the secret 
    secret:'somethinggg',
    saveUninitialized: false,
    resave: false,
    cookie: {
        // number of minutes the session will stay logged in before cookie expiration (logout)
        maxAge: (1000 * 60 * 100)
        // 1000 is to make the time in miliseconds
        // 60 is in seconds
        // 100 is in minutes
        // therefore, it totals to 60,00,000ms

    }
}));

// express app to use the passport
app.use(passport.initialize());

// passport also helps in maintaining express sessions
app.use(passport.session());

// use express router
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running Server: ${err}`);
        return;
    }
    console.log(`Server up and running on Port: ${port}`);
});
