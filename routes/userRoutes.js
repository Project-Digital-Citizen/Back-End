// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: USER operations
 */
/**

 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [USER]
 *     summary: Get a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               user: { "id": "1", "name": "John Doe", "email": "john@example.com" }
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
router.get('/:id', getUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [USER]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               users: [{ "id": "1", "name": "John Doe", "email": "john@example.com" }]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [USER]
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
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
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User updated successfully
 *               user: { "id": "1", "name": "Updated Name", "email": "updated@example.com" }
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid input
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
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [USER]
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User deleted successfully
 *               user: { "id": "1", "name": "Deleted Name", "email": "deleted@example.com" }
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
router.delete('/:id', deleteUser);

module.exports = router;