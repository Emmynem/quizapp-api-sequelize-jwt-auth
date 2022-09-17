import { verifyAdminSignUp, verifyUserSignUp } from "../middleware/index.js";
import { adminSignup, adminSignin, userSignup, userSignin } from "../controllers/auth.controller.js";
import { adminRules } from "../rules/admin.rules.js";
import { userRules } from "../rules/user.rules.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/backoffice/signup",
        [
            adminRules.forAdding,
            verifyAdminSignUp.checkDuplicateEmail
        ],
        adminSignup
    );
    app.post("/api/auth/backoffice/signin", [adminRules.forLogin], adminSignin);
    app.post(
        "/api/auth/signup",
        [
            userRules.forAdding,
            verifyUserSignUp.checkDuplicateEmail
        ],
        userSignup
    );
    app.post("/api/auth/signin", [userRules.forLogin], userSignin);
};