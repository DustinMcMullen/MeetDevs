const mongoose = require('mongoose');



// Creating new UserSchema
const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// Exports the new user created using the model below
module.exports = User = mongoose.model('user', UserSchema);
