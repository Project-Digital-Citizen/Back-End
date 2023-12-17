const Domisili = require("../models/DOMISILI");
const SubmissionStatus = require("../models/STATUS");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Statistic = require("../models/Statistic");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Retrieve NIK from request body or use 'unknown' if not present
    const nik = req.body.NIKPindah || "unknown";

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
    const nik = req.body.NIKPindah || "unknown";
    // Determine suratType based on file name
    let suratType = "unknown";
    if (file.fieldname.toLowerCase().includes("kkdaerahasalimage")) {
      suratType = "kk";
    } else if (
      file.fieldname.toLowerCase().includes("ktpkeluargapindahimage")
    ) {
      suratType = "domisili";
    }

    const imageName = `Foto_${suratType}_${nik}${ext}`;
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 90000000,
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

const uploadFields = upload.fields([
  {
    name: "kkDaerahAsalImage",
    maxCount: 1,
  },
  {
    name: "ktpKeluargaPindahImage",
    maxCount: 1,
  },
]);

async function registerDomisili(req, res) {
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
      !req.files["kkDaerahAsalImage"] ||
      !req.files["ktpKeluargaPindahImage"]
    ) {
      return res.status(400).json({
        status: "error",
        message: "Required images are missing",
      });
    }

    const {
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
    } = req.body;

    const kkDaerahAsalImage = req.files["kkDaerahAsalImage"][0];
    const ktpKeluargaPindahImage = req.files["ktpKeluargaPindahImage"][0];

    const kkDaerahAsalImageUrl = `${req.protocol}://${req.get("host")}/images/${
      kkDaerahAsalImage.filename
    }`;
    const ktpKeluargaPindahImageUrl = `${req.protocol}://${req.get(
      "host"
    )}/images/${ktpKeluargaPindahImage.filename}`;

    try {
      const existingUser = await Domisili.findOne({
        NIK: NIKPindah,
      });

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "NIK already exists in the database",
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
        ktpKeluargaPindahImage: ktpKeluargaPindahImageUrl,
      });

      await domisili.save();

      const newStatistic = new Statistic({
        userMailings: 1,
      });
      await newStatistic.save();
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
      await Domisili.findByIdAndUpdate(domisili._id, {
        submissionStatus: submissionStatus._id,
      });

      res.status(201).json({
        status: "success",
        message: "Domisili registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  });
}

async function getDomisiliData(req, res) {
  try {
    const { nik } = req.params;

    if (!nik) {
      return res.status(400).json({
        status: "error",
        message: "NIK parameter is required",
      });
    }

    const domisiliData = await Domisili.findOne({
      NIKPindah: nik,
    });

    if (!domisiliData) {
      return res.status(404).json({
        status: "error",
        message: "Domisili data not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: domisiliData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function getAllDomisiliData(req, res) {
  try {
    const allDomisiliData = await Domisili.find();

    if (!allDomisiliData || allDomisiliData.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No Domisili data found",
      });
    }

    res.status(200).json({
      status: "success",
      data: allDomisiliData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function verifyDomisili(req, res) {
  try {
    const domisiliId = req.params.id;
    const { verified, reason } = req.body;
     const domisili = await Domisili.findById(domisiliId);
     // Use update method to update the 'verified' field
     const result = await Domisili.updateOne({
       _id: domisiliId
     }, {
       $set: {
         verified: verified || domisili.verified
       }
     });

     if (result.nModified === 0) {
       return res.status(404).json({
         status: "error",
         message: "Domisili not found",
       });
     }

     // Fetch the updated Domisili document
     const updatedomisili = await Domisili.findById(domisiliId);

     if (verified == "reject") {
       await SubmissionStatus.findByIdAndUpdate(domisiliId, {
         rejectionDate: Date.now(),
         rejectionReason: reason,
       });
     } else if (verified == "accept") {
       await SubmissionStatus.findByIdAndUpdate(domisiliId, {
         acceptanceDate: Date.now(),
       });
     }

     res.status(200).json({
       status: "success",
       message: "Domisili verified successfully",
       domisili: updatedomisili,
     });
     }
     catch (error) {
       res.status(500).json({
         status: "error",
         error: error.message,
       });
     }
}

async function deleteDomisili(req, res) {
  try {
    // Ensure NIK is present in the request body
    const { NIK } = req.body;

    // Find the Domisili user based on NIK
    const domisili = await Domisili.findOne({
      NIKPindah: NIK,
    });

    if (!domisili) {
      return res.status(404).json({
        status: "error",
        message: "Domisili data not found",
      });
    }

    // Delete the Domisili user
    await Domisili.findByIdAndRemove(domisili._id);

    res.status(200).json({
      status: "success",
      message: "Domisili data deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

module.exports = {
  registerDomisili,
  getDomisiliData,
  getAllDomisiliData,
  deleteDomisili,
  verifyDomisili,
};
