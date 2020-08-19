const { check } = require('express-validator');

exports.validateAddLink = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    check('url')
        .not()
        .isEmpty()
        .withMessage('URL is required'),
    check('categories')
        .not()
        .isEmpty()
        .withMessage('Pick a category'),
    check('type')
        .not()
        .isEmpty()
        .withMessage('Pick a type Web Page / Video'),

];

exports.validateUpdateLink = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    check('url')
        .not()
        .isEmpty()
        .withMessage('URL is required'),
    check('categories')
        .not()
        .isEmpty()
        .withMessage('Pick a category'),
    check('type')
        .not()
        .isEmpty()
        .withMessage('Pick a type Web Page / Video'),

];