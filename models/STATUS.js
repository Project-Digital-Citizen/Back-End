// models/SubmissionStatus.js
const mongoose = require('mongoose');

const submissionStatusSchema = new mongoose.Schema({
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
