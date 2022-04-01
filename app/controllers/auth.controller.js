const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Admin = db.admin;
// const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.userSignup = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.status(200).send({ message: "User was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.adminSignup = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    Admin.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.status(200).send({ message: "Admin was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.userSignin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            // id: user.id,
            fullname: user.firstName + " " + user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: token
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.adminSignin = (req, res) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "Admin Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            // id: user.id,
            fullname: user.firstName + " " + user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: token
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
