import { validationResult, matchedData } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { ServerError, SuccessResponse, ValidationError, OtherSuccessResponse, CreationSuccessResponse, NotFoundError } from '../common/index.js';
import db from "../models/index.js";
const Questions = db.questions;
const Admin = db.admin;

export function getAdminQuestions(req, res) {
    Questions.findAndCountAll({
        attributes: { exclude: ['id'] },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: Admin,
                attributes: ['firstname', 'lastname', 'email']
            }
        ],
    }).then(questions => {
        if (!questions || questions.length == 0) {
            SuccessResponse(res, "Questions Not found", []);
        } else {
            SuccessResponse(res, "Questions loaded", questions);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getQuestions(req, res) {
    Questions.findAndCountAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'admin_unique_id'] },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(questions => {
        if (!questions || questions.length == 0) {
            SuccessResponse(res, "Questions Not found", []);
        } else {
            SuccessResponse(res, "Questions loaded", questions);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getQuestion(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Questions.findOne({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'admin_unique_id'] },
            where: {
                ...payload
            }
        }).then(question => {
            if (!question) {
                NotFoundError(res, "Question not found", null);
            } else {
                SuccessResponse(res, "Question loaded", question);
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function addQuestion(req, res) {
    const admin_unique_id = req.UNIQUE_ID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Questions.create({ ...payload, unique_id: uuidv4(), admin_unique_id })
            .then(question => {
                CreationSuccessResponse(res, "Question was added successfully!");
            }).catch(err => {
                ServerError(res, err.message, null);
            });
    }
};

export function updateQuestion(req, res) {
    const admin_unique_id = req.UNIQUE_ID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Questions.update({ ...payload, admin_unique_id }, {
            where: {
                unique_id: payload.unique_id,
            }
        }).then(data => {
            if (data == 0) {
                NotFoundError(res, "Question not found", null);
            } else {
                OtherSuccessResponse(res, "Question details updated successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function removeQuestion(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Questions.destroy({
            where: {
                ...payload
            }
        }).then(data => {
            if (!data) {
                NotFoundError(res, "Question not found", null);
            } else {
                OtherSuccessResponse(res, "Question deleted successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};
