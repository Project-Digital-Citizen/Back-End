// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Digzen API',
            version: '1.0.0',
            description: 'Documentation for Digzen API',
        },
        servers: [{
            url: 'http://localhost:3000', // Sesuaikan dengan URL aplikasi Anda
            description: 'Local development server',
        }, ],
    },
    apis: ['./routes/*.js'], // Sesuaikan dengan lokasi file-file route Anda
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};
