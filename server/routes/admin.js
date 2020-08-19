const routerAdmin = require('express').Router();

// controller
const { userProfile, errStatus405 } = require('../controllers');

// middleware
const { requireLogin, adminMiddleware } = require('../middlewares');

routerAdmin
    .route('/')
    //.get(requireLogin, authMiddleware, readProfile)
    .get(requireLogin, adminMiddleware, userProfile)
    .all(errStatus405);
module.exports = routerAdmin;