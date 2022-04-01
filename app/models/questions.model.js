module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
        question: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        option1: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        option2: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        option3: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        option4: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        answer: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
    });
    return Question;
};