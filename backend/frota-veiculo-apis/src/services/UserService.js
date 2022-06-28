const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const security = require('../utils/Security');

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
    const { telephone, name, email, password } = userParam;
    let user = await userRepository.findUserByTelephone(telephone);



    if (user) {
      return {
        statusCode: 406,
        data: 'Usuário já cadastrado!'
      }
    }
    const hashPassword = security.encrypt(password);

    const userData = {
      name,
      email,
      telephone,
      password: hashPassword
    }
    user = await userRepository.createUser(userData);
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
    // get por telefone para validar a senha
    const userPassword = await userRepository.findUserByTelephone(telephone);

    if (userPassword) {
      const hash = userPassword.password;
      const verifyPassword = security.verifyPassword(password, hash);
      if (!verifyPassword) {
        return {
          statusCode: 500,
          data: 'Senha inválida!'
        }
      }

      const user = await userRepository.findUserByTelephoneAndPassWord(telephone, hash);

      if (!user) {
        return {
          statusCode: 500,
          data: 'Login inválido!'
        }
      }
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: 3000 // expiração
      });

      const userAll = await userRepository.findUserById(user._id);
      const data = { auth: true, token: token, user: userAll }
      return {
        statusCode: 200,
        data: data
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
  logon, destroy, update, store, index
};
