const db = require("../models");
const Admin = db.admin;

checkDuplicateEmail = (req, res, next) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

const verifyAdminSignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}
module.exports = verifyAdminSignUp;
