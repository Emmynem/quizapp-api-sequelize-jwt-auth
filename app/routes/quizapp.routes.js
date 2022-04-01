const { authJwt } = require("../middleware");
const admin_controller = require("../controllers/admin.controller");
const user_controller = require("../controllers/user.controller");
const questions_controller = require("../controllers/questions.controller");
const results_controller = require("../controllers/results.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Question routes ------
    app.get("/api/quizapp/questions", questions_controller.getQuestions);
    app.get("/api/quizapp/question/:id", questions_controller.getQuestion);
    app.get(
        "/api/quizapp/backoffice/questions",
        [authJwt.verifyToken, authJwt.isAdmin],
        questions_controller.getAdminQuestions
    );
    app.get(
        "/api/quizapp/backoffice/question/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        questions_controller.getQuestion
    );
    app.post(
        "/api/quizapp/backoffice/question",
        [authJwt.verifyToken, authJwt.isAdmin],
        questions_controller.addQuestion
    );
    app.put(
        "/api/quizapp/backoffice/question/update/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        questions_controller.updateQuestion
    );
    app.delete(
        "/api/quizapp/backoffice/question/remove/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        questions_controller.removeQuestion
    );
    // ----- Question routes
    
    // Admin routes -----

    app.get(
        "/api/quizapp/backoffice/admins",
        [authJwt.verifyToken, authJwt.isAdmin],
        admin_controller.getAdmins
    );
    app.get(
        "/api/quizapp/backoffice/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        user_controller.getUsers
    );
    app.get(
        "/api/quizapp/backoffice/admin/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        admin_controller.getAdmin
    );
    app.put(
        "/api/quizapp/backoffice/update/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        admin_controller.updateAdmin
    );
    app.delete(
        "/api/quizapp/backoffice/remove/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        admin_controller.removeAdmin
    );

    // ----- Admin routes

    // User routes -----

    app.get(
        "/api/quizapp/profile/:id",
        [authJwt.verifyToken, authJwt.isUser],
        user_controller.getUser
    );
    app.put(
        "/api/quizapp/update/:id",
        [authJwt.verifyToken, authJwt.isUser],
        user_controller.updateUser
    );
    app.delete(
        "/api/quizapp/remove/:id",
        [authJwt.verifyToken, authJwt.isUser],
        user_controller.removeUser
    );

    // ----- User routes

    // Result routes -----

    app.post(
        "/api/quizapp/result",
        [authJwt.verifyToken, authJwt.isUser],
        results_controller.addResult
    );
    app.get(
        "/api/quizapp/backoffice/results",
        [authJwt.verifyToken, authJwt.isAdmin],
        results_controller.getAllResults
    );
    app.get(
        "/api/quizapp/results/",
        [authJwt.verifyToken, authJwt.isUser],
        results_controller.getUserResults
    );

    // ----- Result routes
};