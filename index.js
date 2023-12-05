require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const ktpRoutes = require('./routes/ktpRoutes');
const statusRoutes = require('./routes/statusRoutes');
const {
    swaggerUi,
    specs
} = require('./swagger');
const {
    connectDatabase
} = require('./db/database');

const app = express();

app.options('*', cors());
app.use(cors('*'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Connect to MongoDB
connectDatabase();

app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'public', 'images', filename);
    res.set('Content-Type', 'image/jpeg'); // Atur tipe konten gambar
    res.sendFile(imagePath);
});

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Halo, selamat datang di Digzen!'
    });
});

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Use auth routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/email', emailRoutes);
app.use('/ktp', ktpRoutes);
app.use('/status', statusRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});