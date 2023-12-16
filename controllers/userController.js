// controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            const nik = user.NIK || "unknown";
            // Create a new folder for each user based on their NIK
            const userFolder = `./public/imageuser/${nik}`;
            fs.mkdirSync(userFolder, {
                recursive: true,
            });

            // Set the destination path to the user-specific folder
            cb(null, userFolder);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: async function (req, file, cb) {
        try {
            const ext = path.extname(file.originalname);
            const userId = req.params.id;
            const user = await User.findById(userId);
            const nik = user.NIK || "unknown";
            const username = user.nama || "unknown";

            // Determine suratType based on file name
            const imageName = `Foto_${username}_${nik}${ext}`;
            cb(null, imageName);
        } catch (error) {
            cb(error, null);
        }
    },
});



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 90000000
    }, // Increased to 90 MB
    fileFilter: function (req, file, cb) {
        const allowedTypes = [".png", ".jpg", ".jpeg"];
        const ext = path.extname(file.originalname);
        if (!allowedTypes.includes(ext.toLowerCase())) {
            return cb(new Error("Invalid Image Type"));
        }
        cb(null, true);
    },
});

const uploadFields = upload.fields([{
    name: "userImage",
    maxCount: 1,
}, ]);
async function getUser(req, res) {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
}

async function getUsers(req, res) {
    try {
        // Get all users
        const users = await User.find();

        res.status(200).json({
            status: "success",
            users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
}

async function updateUser(req, res) {
    uploadFields(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(422).json({
                status: "error",
                message: err.message,
            });
        } else if (err) {
            return res.status(500).json({
                status: "error",
                message: err.message,
            });
        }

        const userId = req.params.id;
        const {
            email,
            nomor,
            nama,
            password,
            NIK,
            role
        } = req.body;
        const userImage = req.files["userImage"][0];
        const userImageUrl = `${req.protocol}://${req.get("host")}/imageuser/${
                userImage.filename
                }`;
        try {

            // Find the user by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            }



            user.userImage = userImageUrl || '';
            // Update user information
            user.email = email || user.email;
            user.nomor = nomor || user.nomor;
            user.nama = nama || user.nama;
            user.password = password ? await bcrypt.hash(password, 10) : user.password; // Hash password if provided
            user.NIK = NIK || user.NIK;
            user.role = role || user.role;

            // Save the updated user
            await user.save();

            res.status(200).json({
                status: "success",
                message: "User updated successfully",
                user,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                error: error.message,
            });
        }
    });
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;

        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
}

async function changePassword(req, res) {
    try {
        const {
            email,
            otp,
            newPassword
        } = req.body;

        // Validate OTP
        const existingOTP = await OTP.findOne({
            email,
        });

        if (
            !existingOTP ||
            existingOTP.otp !== otp ||
            existingOTP.createdAt <= new Date()
        ) {
            return res.status(403).json({
                status: "error",
                message: "Invalid or expired OTP",
            });
        }

        // Verify user by email
        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
        });

        // Delete the used OTP
        await OTP.findOneAndRemove({
            email,
        });

        res.status(200).json({
            status: "success",
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    changePassword,
};