// models/SubmissionStatus.js
const mongoose = require("mongoose");

const submissionStatusSchema = new mongoose.Schema({
  iduser: {
    type: String,
    required: true,
  },
  idktp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KtpUser",
  },
  iddomisili: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domisili",
  },
  submissionDate: {
    type: Date,
    required: true,
  },
  rejectionDate: {
    type: Date,
  },
  acceptanceDate: {
    type: Date,
  },
  rejectionReason: {
    type: String,
  },
});

const SubmissionStatus = mongoose.model(
  "SubmissionStatus",
  submissionStatusSchema
);

module.exports = SubmissionStatus;
