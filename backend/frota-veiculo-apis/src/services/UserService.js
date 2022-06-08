const mongoose = require('mongoose');
const User = mongoose.model('User');

const findUserByTelephone = async (telephone) => {
  return await User.findOne({ telephone: telephone })
}
const findUserByTelephoneAndPassWord = async (telephone, password) => {
  return await User.findOne({ telephone: telephone }, { password: password })
}
const createUser = async (user) => {
  return await User.create(user);
}
const findUserById = async (id) => {
  return await User.findById({_id: id});
}
module.exports = {
  findUserByTelephone, findUserByTelephoneAndPassWord, createUser, findUserById
}
