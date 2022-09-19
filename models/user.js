const mongoose = require('mongoose');

// import multer and set it up as per requirement for every individual model
const multer = require('multer');

// import path module to set where the uploads will be kept (destination folder)
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true  //to store when the user was created and updated
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());  // fieldname --> avatar
    }
});
// console.log("hello: ",path.join(__dirname, '..', AVATAR_PATH));

// create accessible Static methods (like a global function which can be used for each user, OOPs concept)
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');  // single defines that only one single file can be processed, not multiple.
userSchema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', userSchema);

module.exports = User;