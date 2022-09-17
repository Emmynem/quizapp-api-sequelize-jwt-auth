import Admin from './admin.model.js';

export default (sequelize, Sequelize) => {
    const admins = Admin(sequelize, Sequelize);

    const Question = sequelize.define("questions", { 
        unique_id: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true
        }, 
        admin_unique_id: {
            type: Sequelize.STRING(40),
            allowNull: false,
            references: {
                model: admins,
                key: "unique_id"
            }
        },
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