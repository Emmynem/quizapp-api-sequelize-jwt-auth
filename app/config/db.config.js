module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "quizapp_sequelize",
    dialect: "mysql",
    logging: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};