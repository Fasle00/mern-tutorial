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
        type: Array,
        required: true
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports =  User;