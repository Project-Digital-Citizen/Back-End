require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const {
    connectDatabase
} = require('./db/database');

const app = express();

app.use(express.json());
app.use(cookieParser());
// Connect to MongoDB
connectDatabase();

// Use auth routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});