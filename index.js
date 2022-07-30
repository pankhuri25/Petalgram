const express = require("express");
const port = 8081;
const app = express();
const db = require('./config/mongoose');
const users = require('./models/user');
const expressLayouts = require('express-ejs-layouts');  //installed using npm install express-ejs-layouts
const cookieParser = require('cookie-parser');  //installed using npm install cookie-parser

// used for session cookie (encryption)
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');

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

// use express router
app.use('/', require('./routes'));

// set up view engine
app.set('view engine', 'ejs');  //installed using npm install ejs
app.set('views', './views');

app.use(session({
    name: 'Petalgram',
    // TODO change the secret before deployment to production
    secret:'somethinggg',
    resa
}))

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running Server: ${err}`);
        return;
    }
    console.log(`Server up and running on Port: ${port}`);
});
