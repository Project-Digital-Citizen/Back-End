const mongoose = require('mongoose');

const domisiliSchema = new mongoose.Schema({
    kk: {
        type: String,
        required: true,
    },
    kepalaKeluarga: {
        type: String,
        required: true,
    },
    alamatBaru: {
        type: String,
        required: true,
    },
    provinsi: {
        type: String,
        required: true,
    },
    kabupatenKota: {
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
    klasifikasiPindah: {
        type: String,
        required: true,
    },
    NIKPindah: {
        type: String,
        required: true,
    },
    alasanPindah: {
        type: String,
        required: true,
    },
    kkDaerahAsalImage: {
        type: String, // File path
        required: true,
    },
    ktpKeluargaPindahImage: {
        type: String, // File path
        required: true,
    },
    userSubmitid: {
        type: String,
        default: ''
    },
    verified: {
        type: String,
        default: ''
    },
});

const Domisili = mongoose.model('Domisili', domisiliSchema);

module.exports = Domisili;