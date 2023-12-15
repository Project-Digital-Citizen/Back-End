// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// POST send OTP email
router.post('/send-otp', emailController.sendOTP);
/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Email operations
 */

/**
 * @swagger
 * /email/resend-otp:
 *   post:
 *     tags: [Email]
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
router.post('/resend-otp', emailController.resendOTP);


/**
 * @swagger
 * /email/send-otp-change-password:
 *   post:
 *     summary: Send OTP for password change
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: OTP sent successfully
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.post('/send-otp-change-password', async (req, res) => {
    try {
        const {
            email
        } = req.body;
        // Call the controller function to send OTP
        await emailController.sendOTPChangePassword({
            email
        });
        res.status(200).json({
            status: 'success',
            message: 'OTP sent successfully',
        });
    } catch (error) {
        console.error('Error in sendOTPChangePassword route:', error);
        res.status(500).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
});

module.exports = router;