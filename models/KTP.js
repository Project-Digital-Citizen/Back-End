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
    tempatTanggalLahir: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    agama: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    pekerjaan: {
        type: String,
        required: true,
    },
    kewarganegaraan: {
        type: String,
        required: true,
    },
    rtRw: {
        type: String,
        required: true,
    },
    kecamatan: {
        type: String,
        required: true,
    },
    kelurahanDesa: {
        type: String,
        required: true,
    },
    jenisKelamin: {
        type: String,
        required: true,
    },
    golonganDarah: {
        type: String,
        required: true,
    },
    kkImage: {
        type: Buffer, // File path or Base64 representation
        required: true,
    },
    selfieImage: {
        type: Buffer, // File path or Base64 representation
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const KtpUser = mongoose.model('KtpUser', ktpUserSchema);

module.exports = KtpUser;