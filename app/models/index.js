import { DB, USER, PASSWORD, HOST, dialect as _dialect, logging as _logging, pool as _pool, dialectOptions as _dialectOptions, timezone, production } from "../config/db.config.js";
import Sequelize from "sequelize";
import adminModel from "../models/admin.model.js";
import questionsModel from "../models/questions.model.js";
import resultsModel from "../models/results.model.js";
import userModel from "../models/user.model.js";
const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: _dialect,
        logging: _logging,
        operatorsAliases: 0,
        pool: {
            max: _pool.max,
            min: _pool.min,
            acquire: _pool.acquire,
            idle: _pool.idle
        },
        dialectOptions: {
            // useUTC: _dialectOptions.useUTC, 
            dateStrings: _dialectOptions.dateStrings,
            typeCast: _dialectOptions.typeCast
        },
        timezone: timezone
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = adminModel(sequelize, Sequelize);
db.user = userModel(sequelize, Sequelize);
db.questions = questionsModel(sequelize, Sequelize);
db.results = resultsModel(sequelize, Sequelize);

//    - Questions Associations
db.questions.hasMany(db.admin, { foreignKey: 'unique_id', sourceKey: 'admin_unique_id' });
db.admin.belongsTo(db.questions, { foreignKey: 'unique_id', sourceKey: 'admin_unique_id' });

//    - Results Associations
db.results.hasMany(db.user, { foreignKey: 'unique_id', sourceKey: 'user_unique_id' });
db.user.belongsTo(db.results, { foreignKey: 'unique_id', sourceKey: 'user_unique_id' });

export default db;
