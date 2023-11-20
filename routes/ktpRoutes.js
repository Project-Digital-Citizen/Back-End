const express = require('express');
const router = express.Router();
const ktpController = require('../controllers/ktpController');

// Endpoint for registering KTP user
router.post('/registKTP', ktpController.registerKtpUser);

// Add other routes as needed

module.exports = router;