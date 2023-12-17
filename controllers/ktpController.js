const KtpUser = require("../models/KTP");
const SubmissionStatus = require("../models/STATUS");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Statistic = require("../models/Statistic");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Retrieve NIK from request body or use 'unknown' if not present
    const nik = req.body.NIK || "unknown";

    // Create a new folder for each user based on their NIK
    const userFolder = `./public/images/${nik}`;
    fs.mkdirSync(userFolder, {
      recursive: true,
    });

    // Set the destination path to the user-specific folder
    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nik = req.body.NIK || "unknown";
    // Determine suratType based on file name
    let suratType = "unknown";
    if (file.fieldname.toLowerCase().includes("kkimage")) {
      suratType = "kk";
    } else if (file.fieldname.toLowerCase().includes("selfieimage")) {
      suratType = "selfie";
    } else if (file.fieldname.toLowerCase().includes("suratrtimage")) {
      suratType = "rt";
    } else if (file.fieldname.toLowerCase().includes("suratrwimage")) {
      suratType = "rw";
    }

    const imageName = `Foto_${suratType}_${nik}${ext}`;
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 90000000
  }, // Increased to 90 MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = [".png", ".jpg", ".jpeg"];
    const ext = path.extname(file.originalname);
    if (!allowedTypes.includes(ext.toLowerCase())) {
      return cb(new Error("Invalid Image Type"));
    }
    cb(null, true);
  },
});

const uploadFields = upload.fields([{
    name: "kkImage",
    maxCount: 1,
  },
  {
    name: "selfieImage",
    maxCount: 1,
  },
  {
    name: "suratRTImage",
    maxCount: 1,
  },
  {
    name: "suratRWImage",
    maxCount: 1,
  },
]);

async function registerKtpUser(req, res) {
  uploadFields(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(422).json({
        status: "error",
        message: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }

    if (
      !req.files ||
      !req.files["kkImage"] ||
      !req.files["selfieImage"] ||
      !req.files["suratRTImage"] ||
      !req.files["suratRWImage"]
    ) {
      return res.status(400).json({
        status: "error",
        message: "Required images are missing",
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

    const kkImage = req.files["kkImage"][0];
    const selfieImage = req.files["selfieImage"][0];
    const suratRTImage = req.files["suratRTImage"][0];
    const suratRWImage = req.files["suratRWImage"][0];

    const kkImageUrl = `${req.protocol}://${req.get("host")}/images/${
      kkImage.filename
    }`;
    const selfieImageUrl = `${req.protocol}://${req.get("host")}/images/${
      selfieImage.filename
    }`;
    const suratRTImageUrl = `${req.protocol}://${req.get("host")}/images/${
      suratRTImage.filename
    }`;
    const suratRWImageUrl = `${req.protocol}://${req.get("host")}/images/${
      suratRWImage.filename
    }`;

    try {
      const existingUser = await KtpUser.findOne({
        NIK,
      });

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "NIK already exists in the database",
        });
      }

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
        suratRTImage: suratRTImageUrl,
        suratRWImage: suratRWImageUrl,
      });

      await ktpUser.save();

      const newStatistic = new Statistic({
        userMailings: 1,
      });
      await newStatistic.save();
      // Retrieve user ID from the request parameters
      const userId = req.params.id;

      // Set initial submission status
      const submissionStatus = new SubmissionStatus({
        iduser: userId,
        idktp: ktpUser._id,
        submissionDate: Date.now(),
      });
      await submissionStatus.save();

      // Update user with submission status
      await KtpUser.findByIdAndUpdate(ktpUser._id, {
        submissionStatus: submissionStatus._id,
      });

      res.status(201).json({
        status: "success",
        message: "KTP registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
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
        status: "error",
        message: "NIK parameter is required",
      });
    }

    const ktpData = await KtpUser.findOne({
      NIK: nik,
    });

    if (!ktpData) {
      return res.status(404).json({
        status: "error",
        message: "KTP data not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: ktpData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function getAllKtpData(req, res) {
  try {
    const allKtpData = await KtpUser.find();

    if (!allKtpData || allKtpData.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No KTP data found",
      });
    }

    res.status(200).json({
      status: "success",
      data: allKtpData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function deleteKtp(req, res) {
  try {
    const {
      NIK
    } = req.body;

    // Find the KTP user based on NIK
    const ktpUser = await KtpUser.findOne({
      NIK
    });

    if (!ktpUser) {
      return res.status(404).json({
        status: 'error',
        message: 'KTP data not found',
      });
    }

    // Delete the KTP user
    await KtpUser.findByIdAndRemove(ktpUser._id);

    res.status(200).json({
      status: 'success',
      message: 'KTP data deleted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}


module.exports = {
  registerKtpUser,
  getKtpData,
  getAllKtpData,
  deleteKtp,
};