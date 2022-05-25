const User = require('../models/Users');

const findUserByTelephone = async (telephone) => {
    return await User.findOne({telephone: telephone})
}; 

const createUser = async (user) => {
    return await User.create(user);
}

module.exports = {
    findUserByTelephone, createUser
}