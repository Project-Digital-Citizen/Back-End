// controllers/statisticController.js
const Statistic = require('../models/Statistic');

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
