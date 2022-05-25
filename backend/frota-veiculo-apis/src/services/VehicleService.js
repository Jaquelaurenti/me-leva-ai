const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');
const NewLicensePlate = require('../utils/NewLicensePlate');

const createVehicle = async () => {
    return await Vehicle.create({
        model: 'Tesla Model S',
        licensePlate: NewLicensePlate(),
        status: 'busy'
    });
};

const getAvailableVehicle = async () => {
    return await Vehicle.findOne({ status: 'available' })
};

const setVehicleBusy = async (vehicle) => {
    vehicle.status = 'busy'
    return await Vehicle.findByIdAndUpdate(vehicle._id, vehicle);
};

const setVehicleAvailable = async (vehicle) => {
    vehicle.status = 'available'
    return await Vehicle.findByIdAndUpdate(vehicle._id, vehicle);
}

module.exports = {
    setVehicleAvailable, setVehicleBusy, getAvailableVehicle, createVehicle
}