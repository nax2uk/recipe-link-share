const routerLogin = require('express').Router();
const { validateLogin } = require('../utils/formValidators/userValidators');

// middleware
const { runValidation } = require('../middleware/validators');

//controllers
const { postLogin, errStatus405 } = require('../controllers')


routerLogin
    .route('/')
    .post(validateLogin, runValidation, postLogin)
    .all(errStatus405);

module.exports = routerLogin;