// models/SubmissionStatus.js
const mongoose = require('mongoose');

const submissionStatusSchema = new mongoose.Schema({
    iduser: {
        type: String,
        required: true,
    },
    idktp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KtpUser',
        required: true,
    },
    iddomisili: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domisili',
        required: true,
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
    acceptanceReason: {
        type: String,
    },
});

const SubmissionStatus = mongoose.model('SubmissionStatus', submissionStatusSchema);

module.exports = SubmissionStatus;
