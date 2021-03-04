const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    fname: {type: String,},
    lname: {type: String,},
    email: {type: String,},
    role: {type: String,}     
})
const User = mongoose.model('User', userSchema)
module.exports = User