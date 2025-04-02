
const mongoose =  require('mongoose');
const Users = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true}, 
    email: {type: String, required:true, unique:true},  
    password:{type: String, required:true}, 
    score : {type: Number, default: 0},
    profileImage: { type: String, default: '' }, // Add profile image field
});

const User = mongoose.model('User', UserSchema);


module.exports = User;