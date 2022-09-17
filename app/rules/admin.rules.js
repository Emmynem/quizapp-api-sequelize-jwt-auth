import { check } from 'express-validator';
import { password_options } from '../config/auth.config.js';

export const adminRules = {
    forFindingAdmin: [
        check('unique_id').exists({ checkNull: true, checkFalsy: true }).withMessage("Unique Id is required")
    ],
    forAdding: [
        check('firstname').exists({ checkNull: true, checkFalsy: true }).withMessage("Firstname is required"),
        check('firstname').isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters"),
        check('lastname').exists({ checkNull: true, checkFalsy: true }).withMessage("Lastname is required"),
        check('lastname').isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters"),
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isString().isStrongPassword(password_options).withMessage('Invalid password (must be 8 characters or more and contain one or more uppercase, lowercase, number and special character)'),
        check('confirmPassword').exists({ checkNull: true, checkFalsy: true }).withMessage("Confirm Password is required"),
        check('confirmPassword')
            .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
    ],
    forLogin: [
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').exists().withMessage("Password is required"),
    ],
    forUpdating: [
        check('firstname').exists().withMessage("Firstname is required"),
        check('firstname').isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters"),
        check('lastname').exists().withMessage("Lastname is required"),
        check('lastname').isLength({ min: 3, max: 50 }).withMessage("Invalid length (3 - 50) characters")
    ]
};