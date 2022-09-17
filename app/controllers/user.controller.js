import { validationResult, matchedData } from 'express-validator';
import { ServerError, SuccessResponse, ValidationError, OtherSuccessResponse, NotFoundError } from '../common/index.js';
import db from "../models/index.js";

const User = db.user;

export function getUsers(req, res) {
    User.findAndCountAll({
        attributes: { exclude: ['password', 'id'] },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(users => {
        if (!users || users.length == 0) {
            SuccessResponse(res, "Users Not found", []);
        } else {
            SuccessResponse(res, "Users loaded", users);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        User.findOne({
            attributes: { exclude: ['password', 'id', 'unique_id'] },
            where: {
                ...payload
            }
        }).then(admin => {
            if (!admin) {
                NotFoundError(res, "User not found", null);
            } else {
                SuccessResponse(res, "User loaded", admin);
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function updateUser(req, res) {
    const user_unique_id = req.UNIQUE_ID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        User.update({ ...payload }, {
            where: {
                unique_id: user_unique_id
            }
        }).then(data => {
            if (data == 0) {
                NotFoundError(res, "User not found", null);
            } else {
                OtherSuccessResponse(res, "User details updated successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function removeUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        User.destroy({
            where: {
                ...payload
            }
        }).then(data => {
            if (!data) {
                NotFoundError(res, "User not found", null);
            } else {
                OtherSuccessResponse(res, "User details deleted successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};
