// controllers/authController.js
const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    secretKey
} = require('../middleware/authMiddleware');
const {
    sendOTP
} = require('./emailController');

async function register(req, res) {
    try {
        const {
            email,
            nomor,
            nama,
            password,
            NIK
        } = req.body;

        // Check if email, NIK, or nomor is already registered
        const existingUser = await User.findOne({
            $or: [{
                email
            }, {
                NIK
            }, {
                nomor
            }],
        });

        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email, NIK, or nomor telepon is already registered',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            nomor,
            nama,
            password: hashedPassword,
            NIK,
        });

        // Save the user to the database
        await user.save();

        // Send OTP after successful registration
        await sendOTP({
            email
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

async function verifyOTP(req, res) {
    try {
        const {
            email,
            otp
        } = req.body;

        // Validate OTP
        const savedOTP = await OTP.findOne({
            email,
            otp
        });

        if (!savedOTP) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid OTP',
            });
        }

        // Update user's isActive status to true
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        user.isActive = true;
        await user.save();

        // Remove OTP record from the database after successful verification
        await OTP.findOneAndDelete({
            email,
            otp
        });

        res.status(200).json({
            status: 'success',
            message: 'User verified successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        // Find the user in the database
        const user = await User.findOne({
            email
        });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        // Generate a JWT token
        const token = jwt.sign({
            userId: user._id
        }, secretKey, {
            expiresIn: '1h',
        });

        // Set cookie with the token
        res.cookie('token', token, {
            httpOnly: true
        });

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}


module.exports = {
    register,
    login,
    verifyOTP,
};
