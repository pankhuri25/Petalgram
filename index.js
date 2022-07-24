const express = require("express");
const port = 8081;
const app = express();
const db = require('./config/mongoose');
const users = require('./models/user');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

// extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running Server: ${err}`);
        return;
    }
    console.log(`Server up and running on Port: ${port}`);
});
