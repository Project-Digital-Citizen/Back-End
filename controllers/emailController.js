// controllers/emailController.js
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
});

function generateOTP(length) {
    const charset = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset[randomIndex];
    }

    return otp;
}

async function sendOTP({
    email
}) {
    try {
        // Generate OTP
        const otp = generateOTP(6);

        // Save OTP in the database
        await OTP.create({
            email,
            otp,
        });

        // Send email
        const mailOptions = {
            from: 'Digital Citizen <' + process.env.EMAIL_USERNAME + '>',
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP (One Time Password) is: ${otp}. This OTP is valid for 5 minutes. Do not share it with anyone.`
        };

        await transporter.sendMail(mailOptions);

        return otp;
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw error;
    }
}

module.exports = {
    sendOTP,
};
