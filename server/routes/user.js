const routerUser = require('express').Router();

const { validateRegister } = require('../utils/formValidators');

// validators middleware
const { runValidation } = require('../middleware/validators');
const { requireLogin, userMiddleware } = require('../middleware/auth');
//controllers
const { userRegister, userActivate, userProfile, errStatus405 } = require('../controllers');

routerUser
    .route('/')
    .get(requireLogin, userMiddleware, userProfile)
    .post(validateRegister, runValidation, userRegister)
    .all(errStatus405);
routerUser
    .route('/activate')
    .post(userActivate)
    .all(errStatus405);

module.exports = routerUser;