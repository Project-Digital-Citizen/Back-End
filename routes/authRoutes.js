// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
    register,
    verifyOTP,
    login
} = require('../controllers/authController');

// POST register user
router.post('/register', register);

// POST verify OTP
router.post('/verify-otp', verifyOTP);

// POST login user
router.post('/login', login);

module.exports = router;
