const express = require('express');
const routesRide = express.Router();
// importando o controller
const RideController = require('../controllers/RideController');

routesRide.post('', RideController.ask);
routesRide.get('', RideController.history);
routesRide.get('/:id', RideController.status);
routesRide.get('/users/:id', RideController.userHistory);
routesRide.patch('/:id', RideController.updateStatus);


module.exports = routesRide;
