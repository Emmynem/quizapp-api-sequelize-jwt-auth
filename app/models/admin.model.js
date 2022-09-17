export default (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        unique_id: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true
        },
        firstname: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return Admin;
};