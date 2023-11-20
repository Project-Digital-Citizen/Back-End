const KtpUser = require('../models/KTP');

async function registerKtpUser(req, res) {
    try {
        const {
            nama,
            NIK,
            tempattanggalLahir,
            alamat,
            agama,
            status,
            pekerjaan,
            kewarganegaraan,
            rtrw,
            kecamatan,
            kelurahandesa,
            jeniskelamin,
            golonganDarah,
            kkImage,
            selfieImage
        } = req.body;

        // Check if NIK or nomor is already registered
        const existingUser = await KtpUser.findOne({
            $or: [{
                NIK
            }, {
                nomor
            }],
        });

        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'NIK or nomor telepon is already registered',
            });
        }


        // Create a new user with additional KTP information
        const ktpUser = new KtpUser({
            nama,
            NIK,
            tempattanggalLahir,
            alamat,
            agama,
            status,
            pekerjaan,
            kewarganegaraan,
            rtrw,
            kecamatan,
            kelurahandesa,
            jeniskelamin,
            golonganDarah,
            kkImage,
            selfieImage
        });

        // Save the user to the database
        await ktpUser.save();

        res.status(201).json({
            status: 'success',
            message: 'KTP registered successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

// Add other controller functions as needed

module.exports = {
    registerKtpUser,
    // Add other exported functions here
};