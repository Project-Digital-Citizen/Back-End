const express = require('express');
const router = express.Router();
const ktpController = require('../controllers/ktpController');

/**
 * @swagger
 * tags:
 *   name: KTP
 *   description: KTP registration operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     KTP:
 *       type: object
 *       required:
 *         - nama
 *         - NIK
 *         - tempatTanggalLahir
 *         - alamat
 *         - agama
 *         - status
 *         - pekerjaan
 *         - kewarganegaraan
 *         - rtRw
 *         - kecamatan
 *         - kelurahanDesa
 *         - jenisKelamin
 *         - golonganDarah
 *       properties:
 *         nama:
 *           type: string
 *           description: Full name of the user
 *         NIK:
 *           type: string
 *           description: National Identification Number
 *         tempatTanggalLahir:
 *           type: string
 *           description: Place and date of birth
 *         alamat:
 *           type: string
 *           description: Address of the user
 *         agama:
 *           type: string
 *           description: Religion of the user
 *         status:
 *           type: string
 *           description: Marital status of the user
 *         pekerjaan:
 *           type: string
 *           description: Occupation of the user
 *         kewarganegaraan:
 *           type: string
 *           description: Citizenship of the user
 *         rtRw:
 *           type: string
 *           description: RT/RW of the user's address
 *         kecamatan:
 *           type: string
 *           description: District of the user's address
 *         kelurahanDesa:
 *           type: string
 *           description: Village of the user's address
 *         jenisKelamin:
 *           type: string
 *           description: Gender of the user
 *         golonganDarah:
 *           type: string
 *           description: Blood type of the user
 *         kkImage:
 *           type: string
 *           format: binary
 *           description: File containing the KK (Family Card) image
 *         selfieImage:
 *           type: string
 *           format: binary
 *           description: File containing the user's selfie image
 *       example:
 *         nama: John Doe
 *         NIK: 1234567890123456
 *         tempatTanggalLahir: Jakarta, 01-01-1990
 *         alamat: Jl. Example Street No. 123
 *         agama: Islam
 *         status: Married
 *         pekerjaan: Engineer
 *         kewarganegaraan: Indonesian
 *         rtRw: 001/002
 *         kecamatan: South Jakarta
 *         kelurahanDesa: Example Village
 *         jenisKelamin: Male
 *         golonganDarah: A
 *         kkImage: (binary data)
 *         selfieImage: (binary data)
 */

/**
 * @swagger
 * /ktp:
 *   post:
 *     summary: Register a new KTP user with image uploads
 *     tags: [KTP]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user submitting the KTP registration
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/KTP'
 *     responses:
 *       201:
 *         description: KTP registered successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: KTP registered successfully
 *               kkImageUrl: http://localhost:3000/images/kkImage-1234567890.png
 *               selfieImageUrl: http://localhost:3000/images/selfieImage-0987654321.png
 *               submissionStatus:
 *                 _id: 1234567890abcdef12345678
 *                 iduser: 9876543210fedcba09876543
 *                 submissionDate: '2023-01-15T00:00:00.000Z'
 *                 rejectionDate: null
 *                 acceptanceDate: null
 *                 rejectionReason: null
 *                 acceptanceReason: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */

router.post('/:id', ktpController.registerKtpUser);


/**
 * @swagger
 * /ktp/{nik}:
 *   get:
 *     summary: Get KTP data by NIK
 *     tags: [KTP]
 *     parameters:
 *       - in: path
 *         name: nik
 *         required: true
 *         description: National Identification Number (NIK) of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 nama: John Doe
 *                 NIK: 1234567890123456
 *                 tempatTanggalLahir: Jakarta, 01-01-1990
 *                 alamat: Jl. Example Street No. 123
 *                 agama: Islam
 *                 status: Married
 *                 pekerjaan: Engineer
 *                 kewarganegaraan: Indonesian
 *                 rtRw: 001/002
 *                 kecamatan: South Jakarta
 *                 kelurahanDesa: Example Village
 *                 jenisKelamin: Male
 *                 golonganDarah: A
 *                 kkImage: http://localhost:3000/images/kkImage-1234567890.png
 *                 selfieImage: http://localhost:3000/images/selfieImage-0987654321.png
 *       404:
 *         description: KTP data not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: KTP data not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.get('/:nik', ktpController.getKtpData);

/**
 * @swagger
 * /ktp:
 *   get:
 *     summary: Get all KTP data
 *     tags: [KTP]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data: [{ KTP data object }, { KTP data object }]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.get('/', ktpController.getAllKtpData);

// Add other routes as needed

module.exports = router;