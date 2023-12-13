const express = require('express');
const router = express.Router();
const domisiliController = require('../controllers/domisiliController');

/**
 * @swagger
 * tags:
 *   name: Domisili
 *   description: Domisili registration operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Domisili:
 *       type: object
 *       required:
 *         - kk
 *         - kepalaKeluarga
 *         - alamatBaru
 *         - provinsi
 *         - kabupatenKota
 *         - kecamatan
 *         - kelurahanDesa
 *         - klasifikasiPindah
 *         - NIKPindah
 *         - alasanPindah
 *         - kkDaerahAsalImage
 *         - DomisiliKeluargaPindahImage
 *       properties:
 *         kk:
 *           type: string
 *           description: No. KK of the user
 *         kepalaKeluarga:
 *           type: string
 *           description: Head of Family of the user
 *         alamatBaru:
 *           type: string
 *           description: New Address of the user
 *         provinsi:
 *           type: string
 *           description: Province of the user
 *         kabupatenKota:
 *           type: string
 *           description: Regency of the user
 *         kecamatan:
 *           type: string
 *           description: Subdistrict of the user
 *         kelurahanDesa:
 *           type: string
 *           description: Ward of the user
 *         klasifikasiPindah:
 *           type: string
 *           description: Classification of the user
 *         NIKPindah:
 *           type: string
 *           description: NIK Moved of the user
 *         alasanPindah:
 *           type: string
 *           description: The Reason Moved of the user
 *         kkDaerahAsalImage:
 *           type: string
 *           format: binary
 *           description: File containing the KK (Family Card) image
 *         DomisiliKeluargaPindahImage:
 *           type: string
 *           format: binary
 *           description: File containing the Domisili (Identity Card) image
 *       example:
 *         kk: "93478563975463"
 *         kepalaKeluarga: "Jhon Die"
 *         alamatBaru: "Jl. Example Street No. 123"
 *         provinsi: "Jawa Barat"
 *         kabupatenKota: "Bekasi Utara"
 *         kecamatan: "South Jakarta"
 *         kelurahanDesa: "Example Village"
 *         klasifikasiPindah: "Antar Kota Dalam Provinsi"
 *         NIKPindah: "5983475245"
 *         alasanPindah: "Pekerjaan"
 *         kkDaerahAsalImage: "(binary data)"
 *         DomisiliKeluargaPindahImage: "(binary data)"
 */



/**
 * @swagger
 * /domisili/{id}:
 *   post:
 *     summary: Register a new Domisili user with image uploads
 *     tags: [Domisili]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user submitting the Domisili registration
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Domisili'
 *     responses:
 *       201:
 *         description: Domisili registered successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Domisili registered successfully
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */

router.post('/:id', domisiliController.registerDomisili);


/**
 * @swagger
 * /Domisili/{nik}:
 *   get:
 *     summary: Get Domisili data by NIK
 *     tags: [Domisili]
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
 *                 kk: 93478563975463
 *                 kepalaKeluarga: Jhon Die
 *                 alamatBaru: Jl. Example Street No. 123
 *                 provisi: Jawa Barat
 *                 kabupatenKota: Bekasi Utara
 *                 kecamatan: South Jakarta
 *                 kelurahanDesa: Example Village
 *                 klasifikasiPindah: Antar Kota Dalam Provinsi
 *                 NIKPindah: 5983475245
 *                 alasanPindah: Pekerjaan
 *                 kkDaerahAsalImage: (binary data)
 *                 DomisiliKeluargaPindahImage: (binary data)
 *       404:
 *         description: Domisili data not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Domisili data not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.get('/:nik', domisiliController.getDomisiliData);

/**
 * @swagger
 * /Domisili:
 *   get:
 *     summary: Get all Domisili data
 *     tags: [Domisili]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data: [{ Domisili data object }, { Domisili data object }]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.get('/', domisiliController.getAllDomisiliData);

/**
 * @swagger
 * /Domisili/{id}:
 *   delete:
 *     summary: Delete Domisili data by user ID and NIK
 *     tags: [Domisili]
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
 *         description: National Identification Number (NIK) of the Domisili data to be deleted
 *         schema:
 *           type: object
 *           properties:
 *             NIK:
 *               type: string
 *     responses:
 *       200:
 *         description: Domisili data deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Domisili data deleted successfully
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized to delete this Domisili data
 *       404:
 *         description: Domisili data not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Domisili data not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */
router.delete('/:id', domisiliController.deleteDomisiliByUserId);

module.exports = router;