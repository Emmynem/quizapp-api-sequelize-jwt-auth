const db = require("../models");
const Questions = db.questions;
const Admin = db.admin;

const validateValues = (values, res) => {
    const answersOption = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    if (values.question == "" || values.question == undefined) {
        res.status(400).send({
            message: "Question is required"
        });
        return 0;
    }
    else if (values.option1 == "" || values.option1 == undefined) {
        res.status(400).send({
            message: "Option 1 is required"
        });
        return 0;
    }
    else if (values.option2 == "" || values.option2 == undefined) {
        res.status(400).send({
            message: "Option 2 is required"
        });
        return 0;
    }
    else if (values.option3 == "" || values.option3 == undefined) {
        res.status(400).send({
            message: "Option 3 is required"
        });
        return 0;
    }
    else if (values.option4 == "" || values.option4 == undefined) {
        res.status(400).send({
            message: "Option 4 is required"
        });
        return 0;
    }
    else if (values.answer == "" || values.answer == undefined) {
        res.status(400).send({
            message: "Answer is required"
        });
        return 0;
    }
    else if (!answersOption.includes(values.answer)) {
        res.status(400).send({
            message: "Answer has to be - Option 1, Option 2, Option 3 or Option 4"
        });
        return 0;
    }
    else {
        return 1;
    }
};

exports.getAdminQuestions = (req, res) => {
    Questions.findAll().then(questions => {
        if (!questions) {
            return res.status(404).send({ message: "Questions Not found." });
        }
        res.status(200).send(questions);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getQuestions = (req, res) => {
    Questions.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
    }).then(questions => {
        if (!questions) {
            return res.status(404).send({ message: "Questions Not found." });
        }
        res.status(200).send(questions);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getQuestion = (req, res) => {
    Questions.findByPk(req.params.id).then(question => {
        if (!question) {
            return res.status(404).send({ message: `Question with id - ${req.params.id} Not found.` });
        }
        res.status(200).send(question);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.addQuestion = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Admin.findByPk(req.body.adminId).then(admin => {
        if (!admin) {
            return res.status(404).send({ message: "Admin Not found." });
        }
        else {
            if (validateValues(req.body, res) == 1) {
                Questions.create({
                    adminId: req.body.adminId,
                    question: req.body.question,
                    option1: req.body.option1,
                    option2: req.body.option2,
                    option3: req.body.option3,
                    option4: req.body.option4,
                    answer: req.body.answer
                }).then(question => {
                    res.status(200).send({ message: "Question was added successfully!", data: question });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.updateQuestion = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Admin.findByPk(req.body.adminId).then(admin => {
        if (!admin) {
            return res.status(404).send({ message: "Admin Not found." });
        }
        else {
            Questions.update({
                adminId: req.body.adminId,
                question: req.body.question,
                option1: req.body.option1,
                option2: req.body.option2,
                option3: req.body.option3,
                option4: req.body.option4,
                answer: req.body.answer
            }, {
                where: {
                    id: req.params.id
                }
            }).then(data => {
                if (data == 0) {
                    return res.status(404).send({ message: "Question Not found." });
                }
                res.status(200).send(req.body);
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}   

exports.removeQuestion = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Admin.findByPk(req.body.adminId).then(admin => {
        if (!admin) {
            return res.status(404).send({ message: "Admin Not found." });
        }
        else {
            Questions.destroy({
                where: {
                    id: req.params.id
                }
            }).then(data => {
                if (!data) {
                    return res.status(404).send({ message: "Question Not found." });
                }
                res.status(200).send({ message: `Question wiwth id - ${req.params.id} has been removed` });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
