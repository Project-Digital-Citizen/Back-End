const express = require("express");
const router = express.Router();
const ktpController = require("../controllers/ktpController");

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
 *         - provinsi
 *         - kabupaten
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
 *         provinsi: 
 *           type: string
 *           description: Province of user
 *         kabupaten: 
 *           type: string
 *           description: Regency of user
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
 *         provinsi : South Jakarta
 *         kabupaten : Jaks
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

router.post("/:id", ktpController.registerKtpUser);

/**
 * @swagger
 * /ktp/nik/{nik}:
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
 *                 kkImage: http:*localhost:3000/images/Foto_kk_528323232323001.png
 *                 selfieImage: http:*localhost:3000/images/Foto_selfie_528323232323001.png
 *                 suratRTImage: http:*localhost:3000/images/Foto_rt_528323232323001.png
 *                 suratRWImage: http:*localhost:3000/images/Foto_rw_528323232323001.png
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
router.get("/nik/:nik", ktpController.getKtpData);

/**
 * @swagger
 * /ktp/{id}:
 *   get:
 *     summary: Get KTP data by NIK
 *     tags: [KTP]
 *     parameters:
 *       - in: path
 *         name: id
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
 *                 kkImage: http:*localhost:3000/images/Foto_kk_528323232323001.png
 *                 selfieImage: http:*localhost:3000/images/Foto_selfie_528323232323001.png
 *                 suratRTImage: http:*localhost:3000/images/Foto_rt_528323232323001.png
 *                 suratRWImage: http:*localhost:3000/images/Foto_rw_528323232323001.png
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
router.get("/:id", ktpController.getKtpDataById);

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
router.get("/", ktpController.getAllKtpData);

/**
 * @swagger
 * /ktp/{id}:
 *   put:
 *     summary: Verify KTP
 *     description: Verify the KTP status by ID
 *     tags:
 *       - KTP
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the KTP to verify
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verified:
 *                 type: string
 *                 description: Verification status ("accept" or "reject")
 *                 example: "accept"
 *               reason:
 *                 type: string
 *                 description: Rejection reason (if rejected)
 *                 example: "Incomplete information"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: KTP verified successfully
 *               ktp:
 *                 _id: "60a0b78c4c3b1344dc9308a3"
 *                 nama: "John Doe"
 *                 NIK: "1234567890123456"
 *                 verified: "accept"
 *                 rejectionReason: "Incomplete information"
 *                 acceptanceDate: "2021-05-15T10:30:45.678Z"
 *                 rejectionDate: "2021-05-15T11:45:12.345Z"
 *       404:
 *         description: KTP not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: KTP not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.put("/:id", ktpController.verifyKTP);


/**
 * @swagger
 * /ktp:
 *   delete:
 *     summary: Delete KTP data by NIK
 *     tags: [KTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NIK:
 *                 type: string
 *                 description: National Identification Number to identify the KTP data
 *             required:
 *               - NIK
 *     responses:
 *       200:
 *         description: KTP data deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: KTP data deleted successfully
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
router.delete("/", ktpController.deleteKtp);

module.exports = router;
