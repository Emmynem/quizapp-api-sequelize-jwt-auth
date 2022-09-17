import jwt from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import { UnauthorizedError, ForbiddenError } from '../common/index.js';
import db from "../models/index.js";
const { verify } = jwt;
const User = db.user;
const Admin = db.admin;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.query.token || req.body.token || '';
    if (!token) {
        ForbiddenError(res, "No token provided!", null);
    } else {
        verify(token, secret, (err, decoded) => {
            if (err) {
                UnauthorizedError(res, "Unauthorized!", null);
            } else {
                req.UNIQUE_ID = decoded.unique_id;
                next();
            }
        });
    }
};

const isAdmin = (req, res, next) => {
    Admin.findOne({
        where: {
            unique_id: req.UNIQUE_ID
        }
    }).then(admin => {
        if (!admin) {
            ForbiddenError(res, "Require Admin!", null);
        } else {
            next();
        }
    });
};

const isUser = (req, res, next) => {
    User.findOne({
        where: {
            unique_id: req.UNIQUE_ID
        }
    }).then(admin => {
        if (!admin) {
            ForbiddenError(res, "Require User!", null);
        } else {
            next();
        }
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUser: isUser
}
export default authJwt;
