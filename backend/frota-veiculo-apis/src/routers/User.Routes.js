const express = require('express');
const routesUsers = express.Router();
const verifyJWT = require('../../src/utils/VerifyToken');

// importando o controller
const UserController = require('../controllers/UserController');
routesUsers.get('/:id', UserController.index);
routesUsers.post('/login', UserController.logon);
routesUsers.post('', UserController.store);
routesUsers.put('/:id', UserController.update);
routesUsers.delete('/:id', UserController.destroy);



module.exports = routesUsers;
