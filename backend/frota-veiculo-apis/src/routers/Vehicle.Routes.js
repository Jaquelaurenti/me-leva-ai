const express = require('express');
const routesVehicle = express.Router();

// importando o controller
const VehicleController = require('../controllers/VehicleController');
routesVehicle.get('/vehicles', VehicleController.index);
routesVehicle.post('/vehicles', VehicleController.store);
routesVehicle.get('/vehicles/:id', VehicleController.show);
routesVehicle.put('/vehicles/:id', VehicleController.update);
routesVehicle.delete('/vehicles/:id', VehicleController.destroy);

module.exports = routesVehicle;
