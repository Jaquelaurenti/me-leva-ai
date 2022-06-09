
const vehicleService = require('../services/VehicleService');
const rideService = require('../services/RideService');
const userService = require('../services/UserService');

const status = async (req, res) => {
  try {
    const rides = await rideService.getRides(req.params.id);
    if (!rides) {
      return res.status(404)
        .json({ message: 'Nenhuma corrida encontrada!' });
    }
    return res.json(rides);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const history = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const rides = await rideService.getRides(page);
    if (!rides) {
      return res.status(404)
        .json({ message: 'Nenhuma corrida encontrada!' });
    }
    return res.json(rides);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

}

const userHistory = async (req, res) => {
  try {
    const telephone = req.params.id;
    const { page = 1 } = req.query;
    const history = await rideService.getUserRides(telephone, page)
    if (!history) {
      return res.status(404)
        .json({ message: 'Nenhuma corrida encontrada!' });
    }
    return res.json(history);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const ask = async (req, res) => {
  try {
    const { telephone, startPlace, finishPlace } = req.body;

    const user = await userService.findUserByTelephone(telephone);

    if (!user) {
      return res.status(404)
        .json({ message: 'Usuário não encontrado!' });
    } else {
      const busyUser = await rideService.checkBusyUser(user)
      console.log(busyUser)
      if (busyUser) {
        return res.status(403).json({
          message: 'O usuário já está em uma corrida'
        });
      }
    }

    let vehicle = await vehicleService.getAvailableVehicle();

    if (vehicle) {
      vehicle = await vehicleService.setVehicleBusy(vehicle);
    }
    else {
      vehicle = await vehicleService.createVehicleAutomatic();
    }

    const ride = await rideService.askNewRide(user, vehicle, startPlace, finishPlace);

    return res.status(201).json(ride);

  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const updateStatus = async (req, res) => {
  try {

    let ride = await rideService.getRide(req.params.id);

    if (!ride) {
      return res.status(404)
        .json({ message: 'Corrida não encontrada!' });
    }

    const { type } = req.body;

    switch (type) {
      case 'start':
        if (ride.status == 'started') {
          return res.status(400).send('Corrida já iniciada')
        }
        else if (ride.status == 'finished') {
          return res.status(400).send('Corrida já encerrada')
        }
        return res.json(await rideService.startRide(ride));
      case 'finish':
        if (ride.status == 'asked') {
          return res.status(400).send('Corrida não iniciada')
        } else if (ride.status == 'finished') {
          return res.status(400).send('Corrida já encerrada')
        }
        return res.json(await rideService.finishRide(ride));
      default:
        return res.status(400).send('O valor aguardado é start ou finish.')
    }
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

}

module.exports = {
  status, ask, updateStatus, history, userHistory
};
