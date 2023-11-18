// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a strong and random secret key
const secretKey = crypto.randomBytes(64).toString('hex');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: 'Access denied'
        });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token'
            });
        }

        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
    secretKey, // Export the secret key for other parts of your application
};
