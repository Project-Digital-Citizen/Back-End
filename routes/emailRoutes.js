// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const {
    sendOTP
} = require('../controllers/emailController');

// POST send OTP email
router.post('/send-otp', sendOTP);

module.exports = router;
