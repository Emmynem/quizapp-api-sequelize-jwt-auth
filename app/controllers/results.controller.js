import { validationResult, matchedData } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { ServerError, SuccessResponse, ValidationError, CreationSuccessResponse, ConflictError } from '../common/index.js';
import db from "../models/index.js";

const Results = db.results;
const Questions = db.questions;
const User = db.user;

const lookUpQuestion = (arr, question_unique_id) => {
    let question;
    for (let i = 0; i < arr.length; i++) {
        const _question_unique_id = arr[i]['question_unique_id'];
        if (_question_unique_id === question_unique_id) {
            question = true;
            break;
        }
    }
    return question;
};

const lookUpAnswer = (arr, question_unique_id) => {
    let answer;
    for (let i = 0; i < arr.length; i++) {
        const _question_unique_id = arr[i]['question_unique_id'];
        const _answer = arr[i]['answer'];
        if (_question_unique_id === question_unique_id) {
            answer = _answer;
            break;
        }
    }
    return answer;
};

export function addResult(req, res) {
    const user_unique_id = req.UNIQUE_ID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Questions.findAndCountAll({ attributes: ['unique_id', 'answer'] }).then(data => {
            const total_questions_count = data.count;
            const total_questions = data.rows;
            
            if(payload.datasets.length !== total_questions_count) {
                ConflictError(res, "Invalid number of datasets, must match number of questions");
            } else {

                let correct_answers = 0;
                let incorrect_answers = 0;

                const check_all_questions = [];
                total_questions.map((obj, key) => {
                    const _unique_id = obj.unique_id;
                    const _answer = obj.answer;
                    if (lookUpQuestion(payload.datasets, _unique_id)) { 
                        check_all_questions.push(true);
                        if (lookUpAnswer(payload.datasets, _unique_id) && lookUpAnswer(payload.datasets, _unique_id) === _answer) {
                            correct_answers += 1;
                        } else {
                            incorrect_answers += 1;
                        }
                    } else { 
                        check_all_questions.push(false) 
                    }
                })

                if (check_all_questions.includes(false)) {
                    ConflictError(res, "Not all questions provided are valid");
                } else {
                    const total = correct_answers + incorrect_answers;
                    const average = 100 / total;
                    const percentage = correct_answers * average;

                    Results.create({ unique_id: uuidv4(), user_unique_id, percentage })
                        .then(result => {
                            CreationSuccessResponse(res, "Result was added successfully!", { percentage });
                        }).catch(err => {
                            ServerError(res, err.message, null);
                        });
                }
            }
    
        });
    }
};

export function getAllResults(req, res) {
    Results.findAndCountAll({
        attributes: { exclude: ['id'] },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['firstname', 'lastname', 'email']
            }
        ],
    }).then(results => {
        if (!results || results.length == 0) {
            SuccessResponse(res, "Results Not found", []);
        } else {
            SuccessResponse(res, "Results loaded", results);
        }
    }).catch(err => {
        ServerError(res, err.message, null);
    });
};

export function getUserResults(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        ValidationError(res, "Validation Error Occured", errors.array())
    }
    else {
        const payload = matchedData(req);

        Results.findAndCountAll({
            attributes: { exclude: ['id', 'updatedAt', 'user_unique_id'] },
            where: {
                ...payload
            },
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(results => {
            if (!results || results.length == 0) {
                SuccessResponse(res, "User results Not found", []);
            } else {
                SuccessResponse(res, "User results loaded", results);
            }
        }).catch(err => {
            ServerError(res, err.message, null);
        });
    }
};