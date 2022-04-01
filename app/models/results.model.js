module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("results", {
        percentage: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Result;
};