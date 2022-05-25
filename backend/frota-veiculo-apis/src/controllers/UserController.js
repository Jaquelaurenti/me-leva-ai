const { rideService, userService } = require('../services');
const User = require('../models/Users');
const Logon = require('../models/Logon');

const index = async (req, res) => {
    const { page = 1 } = req.query;

    const users = await User.paginate({}, { page, limit: 10 });

    return res.json(users);
};

const show = async (req, res) => {
    const telephone = req.params.id;

    let user = await userService.findUserByTelephone(telephone)

    if (!user) {
        return res.status(400).send('Usuário não cadastrado');
    }

    return res.json(user);
};

const store = async (req, res) => {
    const { telephone } = req.body

    let user = await userService.findUserByTelephone(telephone)

    if (user) {
        return res.status(400).send('Usuário já cadastrado');
    }

    user = await userService.createUser(req.body)

    return res.status(201).json(user);
};

const update = async (req, res) => {
    const telephone = req.params.id;

    let user = await userService.findUserByTelephone(telephone)

    if (!user) {
        return res.status(400).send('Usuário não cadastrado');
    }

    user = await User.findByIdAndUpdate(user._id, req.body, { new: true });

    return res.json(user);
};

const destroy = async (req, res) => {
    const telephone = req.params.id;

    let user = await userService.findUserByTelephone(telephone)

    if (!user) {
        return res.status(400).send('Usuário não cadastrado');
    }

    user = await User.findByIdAndRemove(user._id);

    return res.send();
};

const logon = async (req, res) => {
    const telephone = req.params.id;

    let user = await userService.findUserByTelephone(telephone)

    if (!user) {
        return res.status(400).send('Usuário não cadastrado');
    }

    let ride = await rideService.checkBusyUser(user);

    //var Logon = new Logon(user);
    let logon = new Logon(user, ride);

    return res.json(logon);
}

module.exports = {
    index, logon, store, show, update, destroy
};