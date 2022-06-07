const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const requireDir = require('require-dir');

const swaggerUi = require('swagger-ui-express');
const specs = require('./src/doc/swaggerDef');
 

//Iniciando o App
const app = express();

app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect(
    //'mongodb://localhost:27017/frotaVeiculo',
"mongodb+srv://jaquelaurenti:EwHBj5geNVER1NDo@melevaai.ixn5yx1.mongodb.net/?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
     }
);

// Fazendo o Require do Schema
requireDir('./src/models');

// consumindo a rota
app.use('/api', require('./src/routes'));


// instanciando o swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


console.log("Ounvindo em http://localhost:3001/api")
app.listen(3001);

