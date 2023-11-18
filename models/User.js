// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nomor: {
        type: String,
        required: true,
        unique: true
    },
    nama: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    NIK: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: false, // Set default value to false
    },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
