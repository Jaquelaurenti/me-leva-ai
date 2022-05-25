const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const requireDir = require('require-dir');

const swaggerUi = require('swagger-ui-express');
const specs = require('./src/doc/swaggerDef');
const routers = require('./src/routers');
 

//Iniciando o App
const app = express();

app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect(
    //'mongodb://localhost:27017/frotaVeiculo',
"mongodb+srv://jaquelaurenti:KcFupEy5CJejDk5T@progwebiii.ewalwob.mongodb.net/?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
     }
);

// Fazendo o Require do Schema
console.log("chegou aqui");
requireDir('./src/models');

// consumindo a rota
app.use('/api', routers );


// instanciando o swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(3001);

