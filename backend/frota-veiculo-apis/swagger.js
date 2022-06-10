const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json';
const endpointsFiles = ['./frota-veiculo-apis/src/routers/index.routes.js'];

const doc = {
  info: {
    version: "1.0.0",
    title: "Me Leva Ai",
    description: ""
  },
  host: "localhost:3001",
  basePath: "/api",
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      in: "header",
      name: "x-access-key",
      description: "Adicionar o token gerado no login"
    }
  },
}

swaggerAutogen(outputFile, endpointsFiles, doc);

