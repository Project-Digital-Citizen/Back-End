// controllers/statisticController.js
const Statistic = require('../models/Statistic');
const cron = require('cron');

// Function to update statistics daily
async function updateStatisticsDaily() {
    try {
        // Add your logic to fetch and update statistics here
        // For example, you can query the database for the data you need
        const userRegisterCount = 0
        const userMailingCount = 0

        // Get the current date
        const currentDate = new Date().toISOString().split('T')[0];

        const newStatistic = new Statistic({
            userRegistrations: userRegisterCount,
            userMailings: userMailingCount,
            date: currentDate
        });
        await newStatistic.save();

        console.log(`Statistics updated for ${currentDate}`);
    } catch (error) {
        console.error('Error updating statistics:', error.message);
    }
}

// Schedule the job to run daily at midnight using cron
new cron.CronJob('0 0 * * *', updateStatisticsDaily, null, true, 'UTC');
async function getAllStatistics(req, res) {
    try {
        const statistics = await Statistic.find();

        // Structure the data in an array
        const dataArray = statistics.map(statistic => ({
            userRegisters: statistic.userRegistrations,
            userMailings: statistic.userMailings,
            date: statistic.date,
        }));

        res.status(200).json({
            status: 'success',
            data: dataArray,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
        });
    }
}

module.exports = {
    getAllStatistics,
};