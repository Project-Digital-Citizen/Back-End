// routes/submissionStatusRoutes.js
const express = require('express');
const router = express.Router();
const submissionStatusController = require('../controllers/statusController');

/**
 * @swagger
 * tags:
 *   name: SubmissionStatus
 *   description: Submission status operations
 */

/**
 * @swagger
 * /status/{id}:
 *   get:
 *     summary: Get submission status by ID
 *     tags: [SubmissionStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the submission status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 _id: 1234567890abcdef12345678
 *                 submissionDate: '2023-01-15T00:00:00.000Z'
 *                 rejectionDate: '2023-01-20T00:00:00.000Z'
 *                 acceptanceDate: null
 *                 rejectionReason: 'Incomplete information'
 *                 acceptanceReason: null
 *       404:
 *         description: Submission status not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Submission status not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */

router.get('/:id', submissionStatusController.getSubmissionStatus);

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get all submission statuses
 *     tags: [SubmissionStatus]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - _id: 1234567890abcdef12345678
 *                   submissionDate: '2023-01-15T00:00:00.000Z'
 *                   rejectionDate: '2023-01-20T00:00:00.000Z'
 *                   acceptanceDate: null
 *                   rejectionReason: 'Incomplete information'
 *                   acceptanceReason: null
 *                 - _id: 567890abcdef12345678901
 *                   submissionDate: '2023-02-10T00:00:00.000Z'
 *                   rejectionDate: null
 *                   acceptanceDate: '2023-02-15T00:00:00.000Z'
 *                   rejectionReason: null
 *                   acceptanceReason: 'Complete information'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */

router.get('/', submissionStatusController.getAllSubmissionStatus);

module.exports = router;
