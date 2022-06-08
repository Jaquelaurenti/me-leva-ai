const express = require('express');
const routesRide = express.Router();
// importando o controller
const RideController = require('../controllers/RideController');

routesRide.post('/rides', RideController.ask);
routesRide.get('/rides', RideController.history);
routesRide.get('/rides/:id', RideController.status);
routesRide.get('/rides/users/:id', RideController.userHistory);
routesRide.patch('/rides/:id', RideController.updateStatus);


module.exports = routesRide;
