// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    getUser,
    getUsers
} = require('../controllers/userController');

// GET a single user by ID
router.get('/:id', getUser);

// GET all users
router.get('/', getUsers);

module.exports = router;
