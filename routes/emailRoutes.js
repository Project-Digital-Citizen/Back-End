// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const {
    sendOTP, resendOTP
} = require('../controllers/emailController');

// POST send OTP email
router.post('/send-otp', sendOTP);

/**
 * @swagger
 * /email/resend-otp:
 *   post:
 *     summary: Resend OTP if expired or not received
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: New OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: New OTP sent successfully
 *       400:
 *         description: Existing OTP is still valid
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Existing OTP is still valid
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.post('/resend-otp', resendOTP);

module.exports = router;
