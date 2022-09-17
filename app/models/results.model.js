import User from './user.model.js';

export default (sequelize, Sequelize) => {
    const users = User(sequelize, Sequelize);

    const Result = sequelize.define("results", {
        unique_id: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true
        },
        user_unique_id: {
            type: Sequelize.STRING(40),
            allowNull: false,
            references: {
                model: users,
                key: "unique_id"
            }
        },
        percentage: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Result;
};