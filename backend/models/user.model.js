const mongoose = require( "mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photos: {
        type: String,
        required: true
    },
    accessLevel: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports =  User;