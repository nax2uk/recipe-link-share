const routerUser = require('express').Router();
const { validateRegister } = require('../utils/formValidators');

// validators middleware
const { runValidation } = require('../middleware/validators');

//controllers
const { userRegister, userActivate, errStatus405 } = require('../controllers');

routerUser
    .route('/')
    .post(validateRegister, runValidation, userRegister)
    .all(errStatus405);
routerUser
    .route('/activate')
    .post(userActivate)
    .all(errStatus405);

module.exports = routerUser;