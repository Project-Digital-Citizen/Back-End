// models/OTP.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String, // Make sure this line is present
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // Set expiration time for 5 minutes (300 seconds)
    },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
