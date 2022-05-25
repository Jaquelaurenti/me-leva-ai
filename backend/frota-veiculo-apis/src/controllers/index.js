const userController = require("../controllers/UserController");
const rideController = require("../controllers/RideController");
const vehicleController = require("../controllers/VehicleController");

// usando a desestruturação para separar os arquivos
module.exports = {
  userController,
  rideController,
  vehicleController
}