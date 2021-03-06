const routerUser = require('express').Router();

//form validators
const { validateRegister, validateForgotPassword, validateResetPassword, } = require('../utils/formValidators/userValidators');

// validators middleware
const { runValidation, requireLogin, userMiddleware } = require('../middlewares');

//controllers
const { userRegister, userActivate, userProfile, userForgotPassword, userResetPassword, errStatus405 } = require('../controllers');

routerUser
    .route('/')
    .get(requireLogin, userMiddleware, userProfile)
    .post(validateRegister, runValidation, userRegister)
    .all(errStatus405);
routerUser
    .route('/activate')
    .post(userActivate)
    .all(errStatus405);
routerUser
    .route('/forgot-password')
    .put(validateForgotPassword, runValidation, userForgotPassword)
    .all(errStatus405);
routerUser
    .route('/reset-password')
    .put(validateResetPassword, runValidation, userResetPassword)
    .all(errStatus405);

module.exports = routerUser;