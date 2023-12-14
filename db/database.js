// db/database.js
const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

module.exports = {
    connectDatabase,
};