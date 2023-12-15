// controllers/submissionStatusController.js
const SubmissionStatus = require('../models/STATUS');

async function getSubmissionStatus(req, res) {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Submission status ID parameter is required',
            });
        }

        // Assuming id represents the iduser
        const submissionStatus = await SubmissionStatus.find({
            iduser: id
        });

        if (!submissionStatus) {
            return res.status(404).json({
                status: 'error',
                message: 'Submission status not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: submissionStatus,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

async function getAllSubmissionStatus(req, res) {
    try {
        const submissionStatuses = await SubmissionStatus.find();
        res.status(200).json({
            status: 'success',
            data: submissionStatuses,
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
    getSubmissionStatus,
    getAllSubmissionStatus
};