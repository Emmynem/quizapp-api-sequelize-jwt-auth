const { verifyAdminSignUp } = require("../middleware");
const { verifyUserSignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/quizapp/auth/backoffice/signup",
        [
            verifyAdminSignUp.checkDuplicateEmail
        ],
        controller.adminSignup
    );
    app.post("/api/quizapp/auth/backoffice/signin", controller.adminSignin);
    app.post(
        "/api/quizapp/auth/signup",
        [
            verifyUserSignUp.checkDuplicateEmail
        ],
        controller.userSignup
    );
    app.post("/api/quizapp/auth/signin", controller.userSignin);
};