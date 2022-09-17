import { validationResult, matchedData } from 'express-validator';
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { ServerError, CreationSuccessResponse, SuccessResponse, ConflictError, ValidationError, UnauthorizedError, NotFoundError } from '../common/index.js';
import db from "../models/index.js";
import { secret } from "../config/auth.config.js";

const User = db.user;
const Admin = db.admin;
// const Op = db.Sequelize.Op;
const { sign } = jwt;
const { hashSync } = bycrypt;
const { compareSync } = bycrypt;

export function userSignup(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        User.create({ ...payload, unique_id: uuidv4(), password: hashSync(payload.password, 8) })
            .then(user => {
                CreationSuccessResponse(res, "User was registered successfully!", { unique_id: user.unique_id });
            }).catch(err => {
                if (err.original.code === 'ER_DUP_ENTRY') {
                    ConflictError(res, "Email already exists", null);
                } else {
                    ServerError(res, err.original.sqlMessage, null);
                }
            });
    }
};

export function adminSignup(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.create({ ...payload, unique_id: uuidv4(), password: hashSync(payload.password, 8) })
            .then(admin => {
                CreationSuccessResponse(res, "Admin was registered successfully!", { unique_id: admin.unique_id });
            }).catch(err => {
                if (err.original.code === 'ER_DUP_ENTRY') {
                    ConflictError(res, "Email already exists", null);
                } else {
                    ServerError(res, err.original.sqlMessage, null);
                }
            });
    }
};

export function userSignin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        User.findOne({
            where: { email: payload.email }
        })
            .then(user => {
                if (!user) {
                    NotFoundError(res, "User not found", null);
                } else {
                    const passwordIsValid = compareSync(payload.password, user.password);
                    if (!passwordIsValid) {
                        UnauthorizedError(res, "Invalid Password!", null);
                    } else {
                        const token = sign({ unique_id: user.unique_id }, secret, {
                            expiresIn: 86400 // 24 hours
                        });
                        SuccessResponse(res, "Logged in successfully!", { 
                            token,
                            fullname: user.firstname + " " + user.lastname,
                            email: user.email,
                        });
                    }
                }
            }).catch(err => {
                ServerError(res, err.message, null);
            });
    }

};

export function adminSignin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.findOne({
            where: { email: payload.email }
        })
            .then(admin => {
                if (!admin) {
                    NotFoundError(res, "Admin not found", null);
                } else {
                    const passwordIsValid = compareSync(payload.password, admin.password);
                    if (!passwordIsValid) {
                        UnauthorizedError(res, "Invalid Password!", null);
                    } else {
                        const token = sign({ unique_id: admin.unique_id }, secret, {
                            expiresIn: 86400 // 24 hours
                        });
                        SuccessResponse(res, "Logged in successfully!", {
                            token,
                            fullname: admin.firstname + " " + admin.lastname,
                            email: admin.email,
                        });
                    }
                }
            }).catch(err => {
                ServerError(res, err.message, null);
            });
    }

};
