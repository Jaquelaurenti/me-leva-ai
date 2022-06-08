const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');


const index = async (req, res) => {

  // utilizando a desestruturação, vamos acessar os parâmetros do request
  const { page = 1 } = req.query;
  // no objeto vazio passaríamos o Where (filtros)
  const vehicles = await Vehicle.paginate({}, { page, limit: 10 });

  return res.json(vehicles);
};
const show = async (req, res) => {
  const vehicles = await Vehicle.findById(req.params.id);

  return res.json(vehicles);
};
const store = async (req, res) => {
  const vehicles = await Vehicle.create(req.body);

  return res.json(vehicles);
};

const update = async (req, res) => {
  const vehicles = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return res.json(vehicles);
};

const destroy = async (req, res) => {
  const vehicles = await Vehicle.findByIdAndRemove(req.params.id);

  return res.send();
};

module.exports = {
  destroy, update, store, show, index
};
