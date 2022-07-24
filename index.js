const express = require("express");
const port = 8081;
const app = express();

const db = require('./config/mongoose');

const users = require('./models/user');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running Server: ${err}`);
        return;
    }
    console.log(`Server up and running on Port: ${port}`);
});
