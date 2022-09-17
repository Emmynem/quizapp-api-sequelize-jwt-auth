import { authJwt } from "../middleware/index.js";
import { getAdmins, getAdmin, updateAdmin, removeAdmin } from "../controllers/admin.controller.js";
import { getUsers, getUser, updateUser, removeUser } from "../controllers/user.controller.js";
import { getQuestions, getQuestion, getAdminQuestions, addQuestion, updateQuestion, removeQuestion } from "../controllers/questions.controller.js";
import { addResult, getAllResults, getUserResults } from "../controllers/results.controller.js";
import { adminRules } from "../rules/admin.rules.js";
import { userRules } from "../rules/user.rules.js";
import { questionsRules } from "../rules/questions.rules.js";
import { resultsRules } from "../rules/results.rules.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Question routes ------
    app.get("/api/questions", getQuestions);
    app.get("/api/question", [questionsRules.forFindingQuestion], getQuestion);
    app.get(
        "/api/backoffice/questions",
        [authJwt.verifyToken, authJwt.isAdmin],
        getAdminQuestions
    );
    app.get(
        "/api/backoffice/question",
        [authJwt.verifyToken, authJwt.isAdmin, questionsRules.forFindingQuestion],
        getQuestion
    );
    app.post(
        "/api/backoffice/question",
        [authJwt.verifyToken, authJwt.isAdmin, questionsRules.forAdding],
        addQuestion
    );
    app.put(
        "/api/backoffice/question",
        [authJwt.verifyToken, authJwt.isAdmin, questionsRules.forUpdating],
        updateQuestion
    );
    app.delete(
        "/api/backoffice/question",
        [authJwt.verifyToken, authJwt.isAdmin, questionsRules.forFindingQuestion],
        removeQuestion
    );
    // ----- Question routes
    
    // Admin routes -----

    app.get(
        "/api/backoffice/admins",
        [authJwt.verifyToken, authJwt.isAdmin],
        getAdmins
    );
    app.get(
        "/api/backoffice/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        getUsers
    );
    app.get(
        "/api/backoffice/admin",
        [authJwt.verifyToken, authJwt.isAdmin, adminRules.forFindingAdmin],
        getAdmin
    );
    app.put(
        "/api/backoffice/admin",
        [authJwt.verifyToken, authJwt.isAdmin, adminRules.forUpdating],
        updateAdmin
    );
    app.delete(
        "/api/backoffice/admin",
        [authJwt.verifyToken, authJwt.isAdmin, adminRules.forFindingAdmin],
        removeAdmin
    );

    // ----- Admin routes

    // User routes -----

    app.get(
        "/api/user",
        [authJwt.verifyToken, authJwt.isUser],
        getUser
    );
    app.put(
        "/api/user",
        [authJwt.verifyToken, authJwt.isUser, userRules.forUpdating],
        updateUser
    );
    app.delete(
        "/api/user",
        [authJwt.verifyToken, authJwt.isAdmin, userRules.forFindingUser],
        removeUser
    );

    // ----- User routes

    // Result routes -----

    app.post(
        "/api/result",
        [authJwt.verifyToken, authJwt.isUser, resultsRules.forAdding],
        addResult
    );
    app.get(
        "/api/backoffice/results",
        [authJwt.verifyToken, authJwt.isAdmin],
        getAllResults
    );
    app.get(
        "/api/results/",
        [authJwt.verifyToken, authJwt.isUser],
        getUserResults
    );

    // ----- Result routes
};