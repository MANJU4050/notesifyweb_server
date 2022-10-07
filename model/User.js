const mongoose = require('mongoose');

//schema for users collection
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password:String,
    mobile:String,
    notes: []
})



module.exports = mongoose.model('User',userSchema)