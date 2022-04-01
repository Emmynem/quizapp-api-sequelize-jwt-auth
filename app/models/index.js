const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        logging: config.logging,
        operatorsAliases: 0,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.questions = require("../models/questions.model.js")(sequelize, Sequelize);
db.results = require("../models/results.model.js")(sequelize, Sequelize);

db.questions.belongsTo(db.admin, {as : "admin"});
db.results.belongsTo(db.user, { as: "user_email"});

module.exports = db;
