const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async findUserByTelephone(telephone) {
        return await User.findOne({telephone: telephone})
    },
    async findUserByTelephoneAndPassWord(telephone, password) {
        return await User.findOne({telephone: telephone}, {password: password})
    },
    async createUser(user){
        return await User.create(user);
    }
}