const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Admin = db.admin;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.the_ID = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    Admin.findByPk(req.the_ID).then(admin => {
        if(!admin){
            res.status(403).send({
                message: "Require Admin!"
            });
            return;
        }
        next();
    });
};

isUser = (req, res, next) => {
    User.findByPk(req.the_ID).then(user => {
        if (!user) {
            res.status(403).send({
                message: "Require User!"
            });
            return;
        }
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUser: isUser
}
module.exports = authJwt;
