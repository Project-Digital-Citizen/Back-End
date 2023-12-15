// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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
router.get('/:id', userController.getUser);

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
router.get('/', userController.getUsers);

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
router.put('/:id', userController.updateUser);

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
router.delete('/:id', userController.deleteUser);


/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change user password using OTP
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               otp: 1234
 *               newPassword: newSecurePassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Password changed successfully
 *       400:
 *         description: Invalid OTP or missing information
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid OTP or missing information
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
router.post('/change-password', userController.changePassword);
module.exports = router;