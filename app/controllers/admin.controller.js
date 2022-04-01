const db = require("../models");
const Admin = db.admin;

exports.getAdmins = (req, res) => {
    Admin.findAll({
        attributes: { exclude: ['password'] }
    }).then(admins => {
        if (!admins) {
            return res.status(404).send({ message: "Admins Not found." });
        }
        res.status(200).send(admins);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAdmin = (req, res) => {
    Admin.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    }).then(admin => {
        if (!admin) {
            return res.status(404).send({ message: `Admin with id - ${req.params.id} Not found.` });
        }
        res.status(200).send(admin);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.updateAdmin = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Admin.update({
        firstName: req.body.firstname,
        lastName: req.body.lastname
    }, {
        where : {
            id: req.params.id
        }
    }).then(data => {
        if (data == 0) {
            return res.status(404).send({ message: "Admin Not found." });
        }
        res.status(200).send(req.body);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}   

exports.removeAdmin = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Admin.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            return res.status(404).send({ message: "Admin Not found." });
        }
        res.status(200).send({ message : `Admin wiwth id - ${req.params.id} has been removed` });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
