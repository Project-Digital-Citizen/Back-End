const KtpUser = require("../models/KTP");

async function saveImage(base64String, filePath) {
  const imageBuffer = Buffer.from(base64String, "base64");

  // Menyimpan gambar ke file atau storage yang diinginkan
  fs.writeFileSync(filePath, imageBuffer);

  return filePath;
}

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
      selfieImage,
    } = req.body;

    // Menyimpan gambar ke file dengan menggunakan NIK sebagai bagian dari path
    const kkImagePath = await saveImage(
      kkImage,
      `path/to/save/${NIK}_kkImage.png`
    );
    const selfieImagePath = await saveImage(
      selfieImage,
      `path/to/save/${NIK}_selfieImage.png`
    );

    // Check if NIK or nomor is already registered
    const existingUser = await KtpUser.findOne({
      $or: [
        {
          NIK,
        },
        {
          nomor,
        },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "NIK or nomor telepon is already registered",
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
      kkImage: kkImagePath,
      selfieImage: selfieImagePath,
    });

    // Save the user to the database
    await ktpUser.save();

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
}

// Add other controller functions as needed

module.exports = {
  registerKtpUser,
  // Add other exported functions here
};
