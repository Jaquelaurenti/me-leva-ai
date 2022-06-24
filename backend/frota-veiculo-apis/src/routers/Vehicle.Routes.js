const express = require('express');
const routesVehicle = express.Router();
const verifyJWT = require('../middleware/verifyToken');


// importando o controller
const VehicleController = require('../controllers/VehicleController');
routesVehicle.get('/vehicles', verifyJWT, VehicleController.index);
routesVehicle.post('/vehicles', verifyJWT, VehicleController.store);
routesVehicle.get('/vehicles/:id', verifyJWT, VehicleController.show);
routesVehicle.put('/vehicles/:id', verifyJWT, VehicleController.update);
routesVehicle.delete('/vehicles/:id', verifyJWT, VehicleController.destroy);

module.exports = routesVehicle;
