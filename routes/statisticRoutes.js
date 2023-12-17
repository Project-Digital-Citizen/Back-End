const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');

/**
 * @swagger
 * tags:
 *   name: Statistics
 * description: Submission Statistics operations
 */

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Get all statistics data
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Successful response with an array of statistics
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data: 
 *                 - userRegister: 10
 *                   userMailing: 5
 *                   date: '2023-12-01'
 *                 - userRegister: 15
 *                   userMailing: 8
 *                   date: '2023-12-02'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               error: Internal Server Error
 */

router.get('/', statisticController.getAllStatistics);

module.exports = router;