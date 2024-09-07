const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/LivroRoutes.js'];

const doc = {
  info: {
    title: 'My API Livraria',
    description: 'Uma API que gerencia uma Livraria'
  },
  host: 'localhost:3001'
};

swaggerAutogen(outputFile, routes, doc);