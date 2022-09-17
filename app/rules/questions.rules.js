import { check } from 'express-validator';
import { answers_option, check_length_TEXT } from '../config/auth.config.js';

export const questionsRules = {
    forFindingQuestion: [
        check('unique_id').exists({ checkNull: true, checkFalsy: true }).withMessage("Unique Id is required")
    ],
    forAdding: [
        check('question').exists({ checkNull: true, checkFalsy: true }).withMessage("Question is required"),
        check('question').isLength({ min: 10, max: check_length_TEXT }).withMessage(`Invalid length (10 - ${check_length_TEXT}) characters`),
        check('option1').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 1 is required"),
        check('option1').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('option2').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 2 is required"),
        check('option2').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('option3').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 3 is required"),
        check('option3').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('option4').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 4 is required"),
        check('option4').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('answer').exists({ checkNull: true, checkFalsy: true }).withMessage("Answer is required"),
        check('answer').isLength({ min: 5, max: 10 }).withMessage("Invalid length (5 - 10) characters"),
        check('answer')
            .custom((answer) => !!answers_option.includes(answer)).withMessage('Answer has to be - Option 1, Option 2, Option 3 or Option 4')
    ],
    forUpdating: [
        check('unique_id').exists().withMessage("Unique Id is required"),
        check('question').exists({ checkNull: true, checkFalsy: true }).withMessage("Question is required"),
        check('question').isLength({ min: 10, max: check_length_TEXT }).withMessage(`Invalid length (10 - ${check_length_TEXT}) characters`),
        check('option1').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 1 is required"),
        check('option1').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('option2').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 2 is required"),
        check('option2').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('option3').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 3 is required"),
        check('option3').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('option4').exists({ checkNull: true, checkFalsy: true }).withMessage("Option 4 is required"),
        check('option4').isLength({ min: 3, max: check_length_TEXT }).withMessage(`Invalid length (3 - ${check_length_TEXT}) characters`),
        check('answer').exists({ checkNull: true, checkFalsy: true }).withMessage("Answer is required"),
        check('answer').isLength({ min: 5, max: 10 }).withMessage("Invalid length (5 - 10) characters"),
        check('answer')
            .custom((answer) => !!answers_option.includes(answer)).withMessage('Answer has to be - Option 1, Option 2, Option 3 or Option 4')
    ]
};