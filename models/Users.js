const mongoose = require('mongoose');
const { route } = require('../routes/api/auth');


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

// Exports the new user created usiing the model below
module.exports = User = mongoose.model('User', UserSchema);