const db = require("../models");
const Results = db.results;
const User = db.user;

const validatePercentage = (percentage, res) => {
    if (percentage == "" || percentage == undefined) {
        res.status(400).send({
            message: "Percentage is required"
        });
        return 0;
    }
    else if (percentage < 0) {
        res.status(400).send({
            message: "Percentage can't be less than 0"
        });
        return 0;
    }
    else if (percentage > 100) {
        res.status(400).send({
            message: "Percentage can't be more than 100"
        });
        return 0;
    }
    else {
        return 1;
    }
};

exports.addResult = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.findByPk(req.body.userEmailId).then(user => {
        if(!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        else {
            if (validatePercentage(req.body.percentage, res) == 1) {
                Results.create({
                    userEmailId: req.body.userEmailId,
                    percentage: req.body.percentage
                }).then(result => {
                    res.status(200).send({ message: "Result was entered successfully!", data: result });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAllResults = (req, res) => {
    Results.findAll().then(results => {
        if (!results) {
            return res.status(404).send({ message: "Results Not found." });
        }
        res.status(200).send(results);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getUserResults = (req, res) => {
    Results.findAll({
        where : {
            userEmailId: req.body.userEmailId
        },
        attributes: { exclude: ['id', 'updatedAt', 'userEmailId'] }
    }).then(results => {
        if (!results) {
            return res.status(404).send({ message: "User results Not found." });
        }
        res.status(200).send(results);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}