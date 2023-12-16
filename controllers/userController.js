// controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getUser(req, res) {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function getUsers(req, res) {
  try {
    // Get all users
    const users = await User.find();

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { email, nomor, nama, password, NIK, role } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Update user information
    user.email = email || user.email;
    user.nomor = nomor || user.nomor;
    user.nama = nama || user.nama;
    user.password = password ? await bcrypt.hash(password, 10) : user.password; // Hash password if provided
    user.NIK = NIK || user.NIK;
    user.role = role || user.role;

    // Save the updated user
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

async function changePassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate OTP
    const existingOTP = await OTP.findOne({
      email,
    });

    if (
      !existingOTP ||
      existingOTP.otp !== otp ||
      existingOTP.createdAt <= new Date()
    ) {
      return res.status(403).json({
        status: "error",
        message: "Invalid or expired OTP",
      });
    }

    // Verify user by email
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    // Delete the used OTP
    await OTP.findOneAndRemove({
      email,
    });

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
};
