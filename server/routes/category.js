const routerCategory = require('express').Router();

// formValidators
const { categoryCreateValidator, categoryUpdateValidator } = require('../utils/formValidators');

// middleware
const { runValidation } = require('../middleware/validators');
const { requireLogin, adminMiddleware } = require('../middleware/auth');

//controller
const { postCategory, getCategory, errStatus405 } = require('../controllers');

routerCategory
    .route('/')
    .post(categoryCreateValidator, runValidation, requireLogin, adminMiddleware, postCategory)
    .get(getCategory)
    .all(errStatus405);

routerCategory
    .route('/:slug')






module.exports = routerCategory;