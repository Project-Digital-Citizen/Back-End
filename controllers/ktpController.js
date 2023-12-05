const KtpUser = require("../models/KTP");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nik = req.body.NIK; // Assuming NIK is included in the request body
    const imageName = `${crypto.randomBytes(3).toString('hex')}_${nik}${ext}`;
    cb(null, imageName);
  }
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000
  },
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
    name: 'kkImage',
    maxCount: 1
  },
  {
    name: 'selfieImage',
    maxCount: 1
  }
]);

async function registerKtpUser(req, res) {
  uploadFields(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(422).json({
        status: 'error',
        message: err.message
      });
    } else if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }

    if (!req.files || !req.files['kkImage'] || !req.files['selfieImage']) {
      return res.status(400).json({
        status: 'error',
        message: 'No kkImage or selfieImage uploaded'
      });
    }

    const {
      nama,
      NIK,
      tempatTanggalLahir,
      alamat,
      agama,
      status,
      pekerjaan,
      kewarganegaraan,
      rtRw,
      kecamatan,
      kelurahanDesa,
      jenisKelamin,
      golonganDarah,
    } = req.body;

    const kkImage = req.files['kkImage'][0];
    const selfieImage = req.files['selfieImage'][0];

    const kkImageUrl = `${req.protocol}://${req.get("host")}/images/${kkImage.filename}`;
    const selfieImageUrl = `${req.protocol}://${req.get("host")}/images/${selfieImage.filename}`;

    try {
      // Check if NIK already exists
      const existingUser = await KtpUser.findOne({
        NIK
      });

      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'NIK already exists in the database',
        });
      }

      // Save the new KTP user
      const ktpUser = new KtpUser({
        nama,
        NIK,
        tempatTanggalLahir,
        alamat,
        agama,
        status,
        pekerjaan,
        kewarganegaraan,
        rtRw,
        kecamatan,
        kelurahanDesa,
        jenisKelamin,
        golonganDarah,
        kkImage: kkImageUrl,
        selfieImage: selfieImageUrl,
      });

      await ktpUser.save();

      res.status(201).json({
        status: 'success',
        message: 'KTP registered successfully',
        kkImageUrl,
        selfieImageUrl,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  });
}


async function getKtpData(req, res) {
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

    const ktpData = await KtpUser.findOne({
      NIK: nik
    });

    if (!ktpData) {
      return res.status(404).json({
        status: 'error',
        message: 'KTP data not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: ktpData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}


async function getAllKtpData(req, res) {
  try {
    const allKtpData = await KtpUser.find();

    if (!allKtpData || allKtpData.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No KTP data found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: allKtpData,
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
  registerKtpUser,
  getKtpData,
  getAllKtpData
};
