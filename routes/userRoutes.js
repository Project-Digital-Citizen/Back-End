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
 *     summary: Update user information and image
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be updated
 *         schema:
 *           type: string
 *       - in: formData
 *         name: email
 *         required: false
 *         description: New email for the user
 *         schema:
 *           type: string
 *       - in: formData
 *         name: nomor
 *         required: false
 *         description: New phone number for the user
 *         schema:
 *           type: string
 *       - in: formData
 *         name: nama
 *         required: false
 *         description: New name for the user
 *         schema:
 *           type: string
 *       - in: formData
 *         name: password
 *         required: false
 *         description: New password for the user
 *         schema:
 *           type: string
 *       - in: formData
 *         name: NIK
 *         required: false
 *         description: New National Identification Number (NIK) for the user
 *         schema:
 *           type: string
 *       - in: formData
 *         name: role
 *         required: false
 *         description: New role for the user (user or admin)
 *         schema:
 *           type: string
 *           enum: [user, admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User updated successfully
 *               user:
 *                 _id: 1234567890abcdef12345678
 *                 email: user@example.com
 *                 nomor: +1234567890
 *                 nama: John Doe
 *                 NIK: 1234567890123456
 *                 role: user
 *                 userImage: http://localhost:3000/images/user-image.jpg
 *       400:
 *         description: Required images are missing
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Required images are missing
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: User not found
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unprocessable Entity
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