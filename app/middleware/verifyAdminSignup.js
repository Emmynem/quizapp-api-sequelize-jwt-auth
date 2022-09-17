import { validationResult, matchedData } from 'express-validator';
import { ConflictError, ValidationError } from '../common/http.js';
import db from "../models/index.js";
const Admin = db.admin;

const checkDuplicateEmail = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Admin.findOne({
            where: {
                email: payload.email,
            }
        }).then(admin => {
            if (admin) {
                ConflictError(res, "Email is already in use!", null);
            } else {
                next();
            }
        });
    }
};

const verifyAdminSignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}
export default verifyAdminSignUp;
