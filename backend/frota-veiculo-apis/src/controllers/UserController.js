const userService = require('../services/UserService');

const index = async (req, res) => {
  const { page = 1 } = req.query;
  const response = await userService.index(page);
  return res.status(response.statusCode).json(response.data);
}

const store = async (req, res) => {
  const user = req.body;
  const response = await userService.store(user);
  return res.status(response.statusCode).json(response.data);
}

const update = async (req, res) => {
  const telephone = req.params.telephone;
  const body = req.body;
  const response = await userService.update(telephone, body);
  return res.status(response.statusCode).json(response.data);
}

const destroy = async (req, res) => {
  const telephone = req.params.telephone;
  const response = await userService.destroy(telephone);
  return res.status(response.statusCode).json(response.data);
}

const logon = async (req, res) => {
  const { telephone, password } = req.body;
  const response = await userService.logon(telephone, password);
  return res.status(response.statusCode).json(response.data);

}
module.exports = {
  logon, destroy, update, store, index
};
