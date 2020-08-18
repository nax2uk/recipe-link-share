const { check } = require('express-validator');

exports.validateAddCategory = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required.'),
    check('image')
        .isEmpty()
        .withMessage('Image is required.'),
    check('content')
        .isLength({ min: 10 })
        .withMessage('Content is required and should be 10 characters long.')
];

exports.validateUpdateCategory = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required.'),
    check('content')
        .isLength({ min: 10 })
        .withMessage('Content is required and should be 10 characters long.')
];