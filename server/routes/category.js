const routerCategory = require('express').Router();

// formValidators
const { validateAddCategory, validateUpdateCategory } = require('../utils/formValidators');

// middleware
const { runValidation } = require('../middleware/validators');
const { requireLogin, adminMiddleware } = require('../middleware/auth');

//controller
const { postCategory, getAllCategories, getCategoryById, removeCategoryById errStatus405 } = require('../controllers');

routerCategory
    .route('/')
    .post(validateAddCategory, runValidation, requireLogin, adminMiddleware, postCategory)
    .get(getAllCategories)
    .all(errStatus405);

routerCategory
    .route('/:slug')
    .get(getCategoryById)
    .put(validateUpdateCategory, runValidation, requireLogin, adminMiddleware, putCategoryById)
    .delete(requireLogin, adminMiddleware, removeCategoryById)
    .all(errStatus405);






module.exports = routerCategory;