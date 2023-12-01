// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function getUser(req, res) {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

async function getUsers(req, res) {
    try {
        // Get all users
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            users,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const {
            email,
            nomor,
            nama,
            password,
            NIK
        } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Update user information
        user.email = email || user.email;
        user.nomor = nomor || user.nomor;
        user.nama = nama || user.nama;
        user.password = password ? await bcrypt.hash(password, 10) : user.password; // Hash password if provided
        user.NIK = NIK || user.NIK;

        // Save the updated user
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;

        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};