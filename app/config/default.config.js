import { v4 as uuidv4 } from 'uuid';
import bycrypt from "bcryptjs";
import db from "../models/index.js";
import { logger } from '../common/index.js';

const { hashSync } = bycrypt;
const Admin = db.admin;
const Questions = db.questions;

const createDefaultQuestions = (admin_unique_id) => {

    const questions = [
        {
            admin_unique_id,
            unique_id: uuidv4(),
            question: "What's the name of star actors in the film Central Intelligence?",
            option1: "Rock and Hart",
            option2: "The Rock and Kevin",
            option3: "Dwayne Johnson and Kevin Hart",
            option4: "Hart and Rock head",
            answer: "Option 3"
        },
        {
            admin_unique_id,
            unique_id: uuidv4(),
            question: "What's the name of star actor in the series The Blacklist?",
            option1: "Raymond Reddington",
            option2: "Hisan Hassani",
            option3: "Elizabeth Jefferson",
            option4: "James Spader",
            answer: "Option 4"
        }
    ];

    Questions.bulkCreate(questions).then(res => {
        logger.warn('Added question defaults');
    }).catch(err => {
        logger.error('Error adding question defaults');
    });

};

export function createAdmin() {

    const details = {
        unique_id: uuidv4(),
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        password: hashSync("John-Doe-1", 8)
    };

    Admin.findOne({ where: { email: details.email } })
        .then(admin => {
            if (!admin) {
                Admin.create(details).then(res => {
                    createDefaultQuestions(res.unique_id);
                    logger.warn('Added admin defaults');
                }).catch(err => {
                    logger.error('Error adding admin defaults');
                });
            }
        }).catch(err => {
            logger.error('Error getting default admin');
        });
};
