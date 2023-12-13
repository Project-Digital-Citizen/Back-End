const Domisili = require("../models/DOMISILI");
const SubmissionStatus = require('../models/STATUS');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Retrieve NIK from request body or use 'unknown' if not present
    const nik = req.body.NIK || 'unknown';

    // Create a new folder for each user based on their NIK
    const userFolder = `./public/images/${nik}`;
    fs.mkdirSync(userFolder, {
      recursive: true
    });

    // Set the destination path to the user-specific folder
    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nik = req.body.NIK || 'unknown';
    // Determine suratType based on file name
    let suratType = 'unknown';
    if (file.fieldname.toLowerCase().includes('kkdaerahasalimage')) {
      suratType = 'kk';
    } else if (file.fieldname.toLowerCase().includes('ktpkeluargapindahimage')) {
      suratType = 'ktp';
    }

    const imageName = `Foto_${suratType}_${nik}${ext}`;
    cb(null, imageName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname);
    if (!allowedTypes.includes(ext.toLowerCase())) {
      return cb(new Error('Invalid Image Type'));
    }
    cb(null, true);
  }
});

const uploadFields = upload.fields([{
  name: 'kkDaerahAsalImage',
  maxCount: 1
},
{
  name: 'ktpKeluargaPindahImage',
  maxCount: 1
}
]);

async function registerDomisili(req, res) {
  uploadFields(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(422).json({
        status: 'error',
        message: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }

    if (!req.files || !req.files['kkDaerahAsalImage'] || !req.files['ktpKeluargaPindahImage']) {
      return res.status(400).json({
        status: 'error',
        message: 'Required images are missing',
      });
    }

    const {
      kk, kepalaKeluarga, alamatBaru, provinsi, kabupatenKota, kecamatan, kelurahanDesa, klasifikasiPindah, NIKPindah, alasanPindah
    } = req.body;

    const kkDaerahAsalImage = req.files['kkDaerahAsalImage'][0];
    const ktpKeluargaPindahImage = req.files['ktpKeluargaPindahImage'][0];

    const kkDaerahAsalImageUrl = `${req.protocol}://${req.get('host')}/images/${kkDaerahAsalImage.filename}`;
    const ktpKeluargaPindahImageUrl = `${req.protocol}://${req.get('host')}/images/${ktpKeluargaPindahImage.filename}`;

    try {
      const existingUser = await Domisili.findOne({
        NIK
      });

      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'NIK already exists in the database',
        });
      }

      const domisili = new Domisili({
        kk,
        kepalaKeluarga,
        alamatBaru,
        provinsi,
        kabupatenKota,
        kecamatan,
        kelurahanDesa,
        klasifikasiPindah,
        NIKPindah,
        alasanPindah,
        kkDaerahAsalImage: kkDaerahAsalImageUrl,
        ktpKeluargaPindahImage: ktpKeluargaPindahImageUrl
      });

      await domisili.save();

      // Retrieve user ID from the request parameters
      const userId = req.params.id;

      // Set initial submission status
      const submissionStatus = new SubmissionStatus({
        iduser: userId,
        iddomisili: domisili._id,
        submissionDate: Date.now(),
      });
      await submissionStatus.save();

      // Update user with submission status
      await domisili.findByIdAndUpdate(domisili._id, {
        submissionStatus: submissionStatus._id,
      });

      res.status(201).json({
        status: 'success',
        message: 'Domisili registered successfully',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  });
}


async function getDomisiliData(req, res) {
  try {
    const {
      nik
    } = req.params;

    if (!nik) {
      return res.status(400).json({
        status: 'error',
        message: 'NIK parameter is required',
      });
    }

    const domisiliData = await Domisili.findOne({
      NIK: nik
    });

    if (!domisiliData) {
      return res.status(404).json({
        status: 'error',
        message: 'Domisili data not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: domsiiliData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}


async function getAllDomisiliData(req, res) {
  try {
    const allDomisiliData = await domisiliData.find();

    if (!allDomisiliData || allDomisiliData.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No Domisili data found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: allDomisiliData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}

async function deleteDomisiliByUserId(req, res) {
  try {
    const {
      id: userId
    } = req.params;
    const {
      NIK
    } = req.body;
    console.log(NIK);
    // Assuming you have a proper authentication mechanism to validate the user's authority to delete the KTP

    // Find the KTP user based on NIK
    const domisili = await Domisili.findOne({
      NIK
    });

    if (!domisili) {
      return res.status(404).json({
        status: 'error',
        message: 'Domisili data not found',
      });
    }

    // Check if the user has the authority to delete this KTP
    if (ktpUser.submissionStatus.iduser.toString() !== userId) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized to delete this Domsili data',
      });
    }

    // Delete the KTP user
    await KtpUser.findByIdAndRemove(domisili._id);

    // Also, you might want to remove related submission status
    await SubmissionStatus.findByIdAndRemove(dimisili.submissionStatus._id);

    res.status(200).json({
      status: 'success',
      message: 'Domisili data deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}

module.exports = {
  registerDomisili,
  getDomisiliData,
  getAllDomisiliData,
  deleteDomisiliByUserId
};
