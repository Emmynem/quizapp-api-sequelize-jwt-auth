const db = require("../models");
const User = db.user;

exports.getUsers = (req, res) => {
    User.findAll({
        attributes: { exclude: ['id', 'password'] }
    }).then(users => {
        if (!users) {
            return res.status(404).send({ message: "Users Not found." });
        }
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getUser = (req, res) => {
    User.findByPk(req.params.id, {
        attributes: { exclude: ['id', 'password'] }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: `User with id - ${req.params.id} Not found.` });
        }
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.updateUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.update({
        firstName: req.body.firstname,
        lastName: req.body.lastname
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (data == 0) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send(req.body);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.removeUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({ message: `User wiwth id - ${req.params.id} has been removed` });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
