const vehicleService = require('../services/VehicleService');

const index = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const vehicles = await vehicleService.paginate(page);
    if (!vehicles) {
      return res.status(404)
        .json({ message: 'Nenhum veículo encontrado' });
    }
    return res.json(vehicles);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

};

const show = async (req, res) => {
  try {
    const vehicles = await vehicleService.findById(req.params.id);
    if (!vehicles) {
      return res.status(404)
        .json({ message: 'Nenhum veículo encontrado' });
    }
    return res.json(vehicles);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

};

const store = async (req, res) => {
  try {
    const vehicles = await vehicleService.create(req.body);
    if (!vehicles) {
      return res.status(404)
        .json({ message: 'Nenhum veículo encontrado' });
    }
    return res.json(vehicles);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

};

const update = async (req, res) => {
  try {
    const vehicles = await vehicleService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicles) {
      return res.status(404)
        .json({ message: 'Nenhum veículo encontrado' });
    }
    return res.json(vehicles);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

};

const destroy = async (req, res) => {
  try {
    const vehicles = await vehicleService.findByIdAndRemove(req.params.id);
    if (!vehicles) {
      return res.status(404)
        .json({ message: 'Nenhum veículo encontrado' });
    }
    return res.send();
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

};

module.exports = {
  destroy, update, store, show, index
};
