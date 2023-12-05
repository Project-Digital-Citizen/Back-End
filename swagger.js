const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digzen API',
      version: '1.0.0', // Take the version from package.json
      description: 'Documentation for Digzen API',
      contact: {
        name: 'Digzen',
        email: 'digzens@gmail.com',
        url: 'https://digzen.site',
      },
      license: {
        name: 'Your License',
        url: 'https://www.example.com/license',
      },
    },
    servers: [
      {
        url: 'https://api.digzen.site', // Your server URL
        description: 'Online Development Server',
      },
      {
        url: 'http://localhost:3000', // Your server URL
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust the location of your route files
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
