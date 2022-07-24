const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const loginUser = mongoose.model('loginUser', loginUserSchema);

module.exports(loginUser);