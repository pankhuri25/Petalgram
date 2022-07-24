const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

// if successful (up and running):
db.once('open', function(){
    console.log("Successfully Connected to DB!")
})

module.exports = db;