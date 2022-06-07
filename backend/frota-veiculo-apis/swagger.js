const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['../frota-veiculo-apis/src/routes.js'];

swaggerAutogen(outputFile, endpointsFiles);