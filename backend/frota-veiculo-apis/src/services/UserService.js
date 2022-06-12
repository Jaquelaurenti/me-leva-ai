const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');

const index = async (page) => {
  try {
    const users = await userRepository.findUser(page);
    if (!users) {
      return {
        statusCode: 404,
        data: 'Nenhum usuário encontrado!'
      }
    }
    return {
      statusCode: 200,
      data: users
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const store = async (userParam) => {
  try {
    const { telephone } = userParam;
    console.log(userParam);
    let user = await userRepository.findUserByTelephone(telephone)

    if (user) {
      return {
        statusCode: 406,
        data: 'Usuário já cadastrado!'
      }
    }
    user = await userRepository.createUser(userParam);
    return {
      statusCode: 201,
      data: user
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const update = async (telephone, body) => {
  try {
    let user = await userRepository.findUserByTelephone(telephone)

    if (!user) {
      return {
        statusCode: 404,
        data: 'Nenhum usuário encontrado'
      }
    }
    user = await userRepository.findByIdAndUpdate(user._id, body);
    return {
      statusCode: 200,
      data: user
    }

  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const destroy = async (telephone) => {
  try {

    let user = await userRepository.findUserByTelephone(telephone);

    if (!user) {
      return {
        statusCode: 400,
        data: 'Usuário não cadastrado!'
      }
    }
    user = await userRepository.findByIdAndRemove(user._id);
    return {
      statusCode: 200,
      data: 'Usuário deletado com sucesso!'
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      data: error
    }
  }
}

const logon = async (telephone, password) => {
  try {
    const user = await userRepository.findUserByTelephoneAndPassWord(telephone, password);
    if (!user) {
      return {
        statusCode: 500,
        data: 'Login inválido!'
      }
    }
    const token = jwt.sign({ user }, "testeJaque", {
      expiresIn: 3000 // expiração
    });

    const userAll = await userRepository.findUserById(user._id);
    const data = { auth: true, token: token, user: userAll }
    return {
      statusCode: 200,
      data: data
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
  logon, destroy, update, store, index
};
