// models/Statistic.js
const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    userRegistrations: {
        type: Number,
        default: 0,
    },
    userMailings: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;
