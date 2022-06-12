
const vehicleService = require('../services/VehicleService');
const rideRepository = require('../repositories/RideRepository');
const userService = require('../services/UserService');

const status = async (id) => {
  try {
    const rides = await rideRepository.getRides(id);
    if (!rides) {
      return {
        statusCode: 404,
        data: 'Nenhuma corrida encontrada!'
      }
    }
    return {
      statusCode: 200,
      data: rides
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const history = async (page) => {
  try {
    const rides = await rideRepository.getRides(page);
    if (!rides) {
      return {
        statusCode: 404,
        data: 'Nenhuma corrida encontrada!'
      }
    }
    return {
      statusCode: 200,
      data: rides
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }

}

const userHistory = async (telephone, page) => {
  try {
    const history = await rideRepository.getUserRides(telephone, page)
    if (!history) {
      return {
        statusCode: 404,
        data: 'Nenhuma corrida encontrada!'
      }
    }
    return {
      statusCode: 200,
      data: history
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const ask = async (telephone, startPlace, finishPlace) => {
  try {
    const user = await userService.findUserByTelephone(telephone);

    if (!user) {
      return {
        statusCode: 404,
        data: 'Nenhum usuário encontrado!'
      }
    } else {
      const busyUser = await rideRepository.checkBusyUser(user);

      if (busyUser) {
        return {
          statusCode: 403,
          data: 'O usuário já está em uma corrida'
        }
      }
    }

    let vehicle = await vehicleService.getAvailableVehicle();

    if (vehicle) {
      vehicle = await vehicleService.setVehicleBusy(vehicle);
    }
    else {
      vehicle = await vehicleService.createVehicleAutomatic();
    }

    const ride = await rideRepository.askNewRide(user, vehicle, startPlace, finishPlace);

    return {
      statusCode: 201,
      data: ride
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const updateStatus = async (id, type) => {
  try {

    let ride = await rideRepository.getRide(id);

    if (!ride) {
      return {
        statusCode: 404,
        data: 'Corrida não encontrada!'
      }
    }

    switch (type) {
      case 'start':
        if (ride.status == 'started') {
          return {
            statusCode: 400,
            data: 'Corrida já iniciada!'
          }
        }
        else if (ride.status == 'finished') {
          return {
            statusCode: 400,
            data: 'Corrida já encerrada!'
          }
        }
      case 'finish':
        if (ride.status == 'asked') {
          return {
            statusCode: 400,
            data: 'Corrida não iniciada!'
          }
        } else if (ride.status == 'finished') {
          return {
            statusCode: 400,
            data: 'Corrida já encerrada!'
          }
        }
        const data = await rideRepository.finishRide(ride);
        return {
          statusCode: 200,
          data: data
        }
      default:
        return {
          statusCode: 200,
          data: 'O valor aguardado é start ou finished!'
        }
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

module.exports = {
  status, ask, updateStatus, history, userHistory
};
