const routerUser = require('./UserRouter');
const routerVehicle = require('./VehicleRouter');
const routerRide = require('./RideRouter');

const express = require('express');
const routes = express.Router();

routes.use('/users', routerUser);
routes.use('/vehicles', routerVehicle);
routes.use('/rides', routerRide);

module.exports = routes;