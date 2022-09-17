import { validationResult, matchedData } from 'express-validator';
import { ConflictError, ValidationError  } from '../common/http.js';
import db from "../models/index.js";
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        User.findOne({
            where: {
                email: payload.email,
            }
        }).then(user => {
            if (user) {
                ConflictError(res, "Email is already in use!", null);
            } else {
                next();
            }
        });
    }
};

const verifyUserSignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}
export default verifyUserSignUp;
