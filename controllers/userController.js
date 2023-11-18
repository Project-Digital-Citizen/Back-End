// controllers/userController.js
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

module.exports = {
    getUser,
    getUsers,
};
