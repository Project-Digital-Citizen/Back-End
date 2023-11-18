const express = require('express');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes');
const {
    connectDatabase
} = require('./db/database');

const app = express();

app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Use auth routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
