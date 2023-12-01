// routes/authRoutes.js
const express = require('express');
const {
    register,
    verifyOTP,
    login
} = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               nomor:
 *                 type: string
 *               nama:
 *                 type: string
 *               password:
 *                 type: string
 *               NIK:
 *                 type: string
 *             required:
 *               - email
 *               - nomor
 *               - nama
 *               - password
 *               - NIK
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       400:
 *         description: Email, NIK, or nomor telepon is already registered
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Email, NIK, or nomor telepon is already registered
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify user with OTP
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User verified successfully
 *       400:
 *         description: Invalid OTP or OTP has expired
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid OTP or OTP has expired
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.post('/verify-otp', verifyOTP);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with existing user credentials
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               token: <JWT Token>
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid email or password
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.post('/login', login);

module.exports = router;
