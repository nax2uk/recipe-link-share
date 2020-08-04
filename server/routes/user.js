const routerAuth = require('express').Router();


// validators
const { userRegisterValidator } = require('../utils/inputValidator');
const { runValidation } = require('../validators');

//controllers
const { register, registerActivate } = require('../controllers/user');
const { errStatus405 } = require('../controllers/error')

routerAuth
    .route('/user')
    .post(userRegisterValidator, runValidation, register)
    .all(errStatus405);
routerAuth
    .route('/user/activate')
    .post(registerActivate)
    .all(errStatus405);

module.exports = routerAuth;