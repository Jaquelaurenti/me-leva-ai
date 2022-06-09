const vehicleService = require('../services/VehicleService');

const index = async (req, res) => {
  const { page = 1 } = req.query;
  const vehicles = await vehicleService.paginate(page);
  return res.json(vehicles);
};

const show = async (req, res) => {
  const vehicles = await vehicleService.findById(req.params.id);
  return res.json(vehicles);
};

const store = async (req, res) => {
  const vehicles = await vehicleService.create(req.body);
  return res.json(vehicles);
};

const update = async (req, res) => {
  const vehicles = await vehicleService.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return res.json(vehicles);
};

const destroy = async (req, res) => {
  const vehicles = await vehicleService.findByIdAndRemove(req.params.id);

  return res.send();
};

module.exports = {
  destroy, update, store, show, index
};
