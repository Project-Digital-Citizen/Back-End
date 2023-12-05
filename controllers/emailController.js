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
        // Check if there is an existing OTP for the email
        const existingOTP = await OTP.findOne({
            email
        });

        if (existingOTP && existingOTP.createdAt > new Date()) {
            // Existing OTP is still valid, return it
            return existingOTP.otp;
        } else {
            // Generate a new OTP
            const otp = generateOTP(4);

            // Save the new OTP in the database or update the existing record
            await OTP.findOneAndUpdate({
                    email
                }, {
                    otp,
                    createdAt: new Date(Date.now() + 300000)
                }, // Set expiration time for 5 minutes
                {
                    upsert: true,
                    new: true
                }
            );

            // Send email
            const mailOptions = {
                from: 'Digital Citizen <' + process.env.EMAIL_USERNAME + '>',
                to: email,
                subject: 'Your OTP for Verification',
                text: `Your OTP (One Time Password) is: ${otp}. This OTP is valid for 5 minutes. Do not share it with anyone.`
            };

            await transporter.sendMail(mailOptions);

            return otp;
        }
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw error;
    }
}

async function resendOTP(req, res) {
    try {
        const {
            email
        } = req.body;

        // Check if there is an existing OTP for the email
        const existingOTP = await OTP.findOne({
            email
        });

        if (existingOTP && existingOTP.createdAt > new Date()) {
            // Existing OTP is still valid, return a response indicating that the OTP is still valid
            return res.status(400).json({
                status: 'error',
                message: 'Existing OTP is still valid',
            });
        }

        // Generate a new OTP
        const newOTP = generateOTP(4);

        // Save the new OTP in the database or update the existing record
        await OTP.findOneAndUpdate({
                email
            }, {
                otp: newOTP,
                createdAt: new Date(Date.now() + 300000)
            }, // Set expiration time for 5 minutes
            {
                upsert: true,
                new: true
            }
        );

        try {
            const mailOptions = {
                from: 'Digital Citizen <' + process.env.EMAIL_USERNAME + '>',
                to: email,
                subject: 'Your OTP for Verification',
                text: `Your OTP (One Time Password) is: ${newOTP}. This OTP is valid for 5 minutes. Do not share it with anyone.`
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending OTP email:', error.message);
            throw error;
        }

        res.status(200).json({
            status: 'success',
            message: 'New OTP sent successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

module.exports = {
    sendOTP,
    resendOTP
};
