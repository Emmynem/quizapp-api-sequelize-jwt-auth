import { validationResult, matchedData } from 'express-validator';  
import { ServerError, SuccessResponse, ValidationError, OtherSuccessResponse, NotFoundError } from '../common/index.js';
import db from "../models/index.js";

const Admin = db.admin;
const Op = db.Sequelize.Op;

export function getAdmins(req, res) {
    Admin.findAndCountAll({
        attributes: { exclude: ['password', 'id'] },
        where: {
            id: {
                [Op.ne]: 1
            }
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(admins => {
        if (!admins || admins.length == 0) {
            SuccessResponse(res, "Admins Not found", []);
        } else {
            SuccessResponse(res, "Admins loaded", admins);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getAdmin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.findOne({
            attributes: { exclude: ['password', 'id'] },
            where: {
                ...payload,
                id: {
                    [Op.ne]: 1
                }
            }
        }).then(admin => {
            if (!admin) {
                NotFoundError(res, "Admin not found", null);
            } else {
                SuccessResponse(res, "Admin loaded", admin);
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function updateAdmin(req, res) {
    const admin_unique_id = req.UNIQUE_ID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.update({ ...payload }, {
            where: {
                unique_id: admin_unique_id,
                id: {
                    [Op.ne]: 1
                }
            }
        }).then(data => {
            if (data == 0) {
                NotFoundError(res, "Admin not found", null);
            } else {
                OtherSuccessResponse(res, "Admin details updated successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};

export function removeAdmin(req, res) {
    const admin_unique_id = req.UNIQUE_ID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.destroy({
            where: {
                ...payload,
                [Op.and]: [{
                    id: {
                        [Op.ne]: 1
                    }
                }, {
                    unique_id: {
                        [Op.ne]: admin_unique_id
                    }
                }]
            }
        }).then(data => {
            if (!data) {
                NotFoundError(res, "Admin not found", null);
            } else {
                OtherSuccessResponse(res, "Admin details deleted successfully!");
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};
