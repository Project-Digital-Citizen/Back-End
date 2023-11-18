require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const {
    connectDatabase
} = require('./db/database');

const app = express();

app.use(express.json());
app.use(cookieParser());
// Connect to MongoDB
connectDatabase();

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Halo, selamat datang di Digzen!'
    });
});

// Use auth routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/email', emailRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});