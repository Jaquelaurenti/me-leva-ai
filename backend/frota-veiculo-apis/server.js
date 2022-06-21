const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json');


//Iniciando o App
const app = express();

app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect(
  //'mongodb://localhost:27017/frotaVeiculo',
  "mongodb+srv://jaquelaurenti:H0FDQSBtU61gl87E@melevaaipessoal.4rqgens.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Fazendo o Require do Schema
requireDir('./src/models');

// consumindo a rota
app.use('/api', require('./src/routers/index.routes'));


// instanciando o swagger

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

console.log("Ounvindo em http://localhost:3001/api")
app.listen(3001);

