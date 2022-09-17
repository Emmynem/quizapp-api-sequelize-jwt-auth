import { check } from 'express-validator';

const checkKey = (arr, keyName) => {
    const check_all = [];
    arr.map((obj, key) => {
        const keyExist = Object.keys(obj).some(key => key === keyName);
        check_all.push(keyExist);
    })
    if (check_all.includes(false)) return false;
    return true;
};

export const resultsRules = {   
    forAdding: [
        check('datasets').exists({ checkNull: true, checkFalsy: true }).withMessage("Datasets is required"),
        check('datasets').isArray().withMessage('Datasets is not an array'),
        check('datasets')
            .custom((datasets) => checkKey(datasets, 'question_unique_id') && checkKey(datasets, 'answer')).withMessage("Each dataset must have a 'question_unique_id' and 'answer' value")
    ]
};