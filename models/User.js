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
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user',
    },
    userImage: {
        type: String, 
    },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
