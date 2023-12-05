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

        const submissionStatus = await SubmissionStatus.findById(id);

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

module.exports = {
    getSubmissionStatus,
};
