const express = require('express');
const router = express.Router();
const ktpController = require('../controllers/ktpController');

// Endpoint for registering KTP user
/**
* @swagger
* /ktp/registKTP:
* post:
*  summary: Register a new KTP user
*  requestBody:
*    required: true
*    content:
*      application/json:
*        schema:
*          type: object
*          properties:
*            NIK:
*              type: string
*              description: National Identity Number
*            nama:
*              type: string
*              description: Full name of the user
*            tempattanggalLahir:
*              type: string
*              description: Place and date of birth
*            alamat:
*              type: string
*              description: Address of the user
*            agama:
*              type: string
*              description: Religion of the user
*            status:
*              type: string
*              description: Marital status of the user
*            pekerjaan:
*              type: string
*              description: Occupation of the user
*            kewarganegaraan:
*              type: string
*              description: Citizenship of the user
*            rtrw:
*              type: string
*              description: RT/RW of the user's address
*            kecamatan:
*              type: string
*              description: District of the user's address
*            kelurahandesa:
*              type: string
*              description: Village of the user's address
*            jeniskelamin:
*              type: string
*              description: Gender of the user
*            golonganDarah:
*              type: string
*              description: Blood type of the user
*            kkImage:
*              type: string
*              description: Base64 string or file path of the KK image
*            selfieImage:
*              type: string
*              description: Base64 string or file path of the selfie image
*  responses:
*    '201':
*      description: User registered successfully
*    '400':
*      description: Bad request
*    '500':
*      description: Internal server error
*/
router.post('/registKTP', ktpController.registerKtpUser);

// Add other routes as needed

module.exports = router;