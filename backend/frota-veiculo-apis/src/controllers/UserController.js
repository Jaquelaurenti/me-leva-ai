const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = {
    async index(req, res) {
     
        const { page = 1 } = req.query;

        const users = await User.paginate({}, { page, limit: 10 });

        return res.json(users);
    },
    async show(req, res) {
        const telephone = req.params.id;

        let user = await userService.findUserByTelephone(telephone)

        if (!user) {
            return res.status(400).send('Usuário não cadastrado');
        }

        return res.json(user);
    },
    async store(req, res) {
        const { telephone } = req.body

        let user = await userService.findUserByTelephone(telephone)

        if (user) {
            return res.status(400).send('Usuário já cadastrado');
        }

        user = await userService.createUser(req.body)

        return res.status(201).json(user);
    },

    async update(req, res) {
        const telephone = req.params.id;

        let user = await userService.findUserByTelephone(telephone)

        if (!user) {
            return res.status(400).send('Usuário não cadastrado');
        }

        user = await User.findByIdAndUpdate(user._id, req.body, { new: true });

        return res.json(user);
    },

    async destroy(req, res) {
        const telephone = req.params.id;

        let user = await userService.findUserByTelephone(telephone)

        if (!user) {
            return res.status(400).send('Usuário não cadastrado');
        }

        user = await User.findByIdAndRemove(user._id);

        return res.send();
    },

    async logon(req, res) {
        const { telephone, password } = req.body;
        let user = await userService.findUserByTelephoneAndPassWord(telephone, password);
        if (!user) {
            return res.status(500)
                .json({ message: 'Login inválido!' });
        }
        const token = jwt.sign({ user }, "testeJaque", {
            expiresIn: 3000 // expiração
        });

        return res.json({ auth: true, token: token });

    }
};