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
 *         - ktpKeluargaPindahImage
 *       properties:
 *         kk:
 *           type: string
 *           description: Family Card number
 *         kepalaKeluarga:
 *           type: string
 *           description: Head of the family name
 *         alamatBaru:
 *           type: string
 *           description: New address of the family
 *         provinsi:
 *           type: string
 *           description: Province of the new address
 *         kabupatenKota:
 *           type: string
 *           description: Regency or city of the new address
 *         kecamatan:
 *           type: string
 *           description: District of the new address
 *         kelurahanDesa:
 *           type: string
 *           description: Village of the new address
 *         klasifikasiPindah:
 *           type: string
 *           description: Classification of the relocation
 *         NIKPindah:
 *           type: string
 *           description: National Identification Number of the individual relocating
 *         alasanPindah:
 *           type: string
 *           description: Reason for relocation
 *         kkDaerahAsalImage:
 *           type: string
 *           format: binary
 *           description: File containing the Family Card image from the original area
 *         ktpKeluargaPindahImage:
 *           type: string
 *           format: binary
 *           description: File containing the Family Member's ID Card image for relocation
 *       example:
 *         kk: '1234567890'
 *         kepalaKeluarga: 'John Doe'
 *         alamatBaru: 'Jl. New Street No. 456'
 *         provinsi: 'DKI Jakarta'
 *         kabupatenKota: 'Jakarta Selatan'
 *         kecamatan: 'Kebayoran Baru'
 *         kelurahanDesa: 'Gandaria Utara'
 *         klasifikasiPindah: 'Pindah Domisili'
 *         NIKPindah: '1234567890123456'
 *         alasanPindah: 'Work relocation'
 *         kkDaerahAsalImage: (binary data)
 *         ktpKeluargaPindahImage: (binary data)
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
 *       400:
 *         description: Required images are missing or invalid request
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Required images are missing
 *       404:
 *         description: User not found or NIK already exists in the database
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: User not found or NIK already exists in the database
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
 * /domisili/{nik}:
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
 * /domisili:
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
 * /domisili:
 *   delete:
 *     summary: Delete Domisili data by NIK
 *     tags: [Domisili]
 *     requestBody:
 *       description: JSON object containing the National Identification Number (NIK) of the Domisili data to be deleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NIK:
 *                 type: string
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
router.delete('/', domisiliController.deleteDomisili);

module.exports = router;