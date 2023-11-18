// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// GET a single user by ID
router.get('/:id', getUser);

// GET all users
router.get('/', getUsers);

// PUT update user by ID
router.put('/:id', updateUser);

// DELETE user by ID
router.delete('/:id', deleteUser);

module.exports = router;
