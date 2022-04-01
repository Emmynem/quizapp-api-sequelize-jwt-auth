module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        firstName: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return Admin;
};