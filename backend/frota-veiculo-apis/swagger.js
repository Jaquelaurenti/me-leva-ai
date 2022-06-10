const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json';
const endpointsFiles = ['./frota-veiculo-apis/src/routers/index.routes.js'];

swaggerAutogen(outputFile, endpointsFiles);
