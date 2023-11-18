// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
     definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digzen API',
      version: '1.0.0', // Mengambil versi dari package.json
      description: 'Documentation for Digzen API',
    },
  },
    apis: ['./routes/*.js'], // Sesuaikan dengan lokasi file-file route Anda
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};
