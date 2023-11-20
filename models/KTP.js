// models/KtpUser.js
const mongoose = require('mongoose');

const ktpUserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    NIK: {
        type: String,
        required: true,
        unique: true,
    },
    tanggalLahir: {
        type: Date,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    golonganDarah: {
        type: String,
        required: true,
    },
    kkImage: {
        type: String, // File path or Base64 representation
        required: true,
    },
    selfieImage: {
        type: String, // File path or Base64 representation
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const KtpUser = mongoose.model('KtpUser', ktpUserSchema);

module.exports = KtpUser;
