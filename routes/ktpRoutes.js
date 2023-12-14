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
 *         - kkImage
 *         - selfieImage
 *         - suratRTImage
 *         - suratRWImage
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
 *         suratRTImage:
 *           type: string
 *           format: binary
 *           description: File containing the user's Surat RT image
 *         suratRWImage:
 *           type: string
 *           format: binary
 *           description: File containing the user's Surat RW image
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
 *         suratRTImage: (binary data)
 *         suratRWImage: (binary data)
 */


/**
 * @swagger
 * /ktp/{id}:
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
 *                 kkImage: http://localhost:3000/images/Foto_kk_528323232323001.png
 *                 selfieImage: http://localhost:3000/images/Foto_selfie_528323232323001.png
 *                 suratRTImage: http://localhost:3000/images/Foto_rt_528323232323001.png
 *                 suratRWImage: http://localhost:3000/images/Foto_rw_528323232323001.png
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

/**
 * @swagger
 * /ktp/{id}:
 *   delete:
 *     summary: Delete KTP data by user ID and NIK
 *     tags: [KTP]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: NIK
 *         required: true
 *         description: National Identification Number (NIK) of the KTP data to be deleted
 *         schema:
 *           type: object
 *           properties:
 *             NIK:
 *               type: string
 *     responses:
 *       200:
 *         description: KTP data deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: KTP data deleted successfully
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized to delete this KTP data
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
router.delete('/', ktpController.deleteKtpByUserId);

module.exports = router;