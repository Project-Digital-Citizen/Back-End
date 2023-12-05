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
    const imageName = crypto.randomBytes(16).toString('hex') + ext;
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

async function registerKtpUser(req, res) {
  upload.single('kkImage')(req, res, async function (err) {
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

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No kkImage Uploaded'
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
    const kkImagePath = req.file.filename;
    
    upload.single('selfieImage')(req, res, async function (err) {
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

      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'No selfieImage Uploaded'
        });
      }

      const selfieImagePath = req.file.filename;
      const kkImageUrl = `${req.protocol}://${req.get("host")}/images/${kkImagePath}`;
      const selfieImageUrl = `${req.protocol}://${req.get("host")}/images/${selfieImagePath}`;
      try {
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
        console.log(ktpUser);
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
  });
}

async function getKtpData(req, res) {
  try {
    // Assuming you are passing the NIK as a query parameter
    const {
      NIK
    } = req.query;

    if (!NIK) {
      return res.status(400).json({
        status: 'error',
        message: 'NIK parameter is required',
      });
    }

    const ktpData = await KtpUser.findOne({
      NIK
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

module.exports = {
  registerKtpUser,
  getKtpData
};
