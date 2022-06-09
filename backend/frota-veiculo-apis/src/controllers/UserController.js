const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');

const index = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const users = await userService.findUser(page);
    if (!users) {
      return res.status(404)
        .json({ message: 'Nenhum usuário encontrado' });
    }
    return res.json(users);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const store = async (req, res) => {
  try {
    const { telephone } = req.body
    let user = await userService.findUserByTelephone(telephone)

    if (user) {
      return res.status(406).send('Usuário já cadastrado');
    }
    user = await userService.createUser(req.body);
    return res.status(201).json(user);
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const update = async (req, res) => {
  try {
    const telephone = req.params.id;
    const body = req.body;

    let user = await userService.findUserByTelephone(telephone)

    if (!user) {
      return res.status(404)
        .json({ message: 'Nenhum usuário encontrado' });
    }
    user = await userService.findByIdAndUpdate(user._id, body);
    return res.json(user);

  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const destroy = async (req, res) => {
  try {
    const telephone = req.params.id;

    let user = await userService.findUserByTelephone(telephone);

    if (!user) {
      return res.status(400)
        .json({ message: 'Usuário não cadastrado' });
    }

    user = await userService.findByIdAndRemove(user._id);

    return res.send();
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }

}

const logon = async (req, res) => {
  try {
    const { telephone, password } = req.body;
    const user = await userService.findUserByTelephoneAndPassWord(telephone, password);
    if (!user) {
      return res.status(500).json({
        message: 'Login inválido!'
      });
    }
    const token = jwt.sign({ user }, "testeJaque", {
      expiresIn: 3000 // expiração
    });

    const userAll = await userService.findUserById(user._id);
    return res.json({ auth: true, token: token, user: userAll });
  }
  catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}
module.exports = {
  logon, destroy, update, store, index
};
