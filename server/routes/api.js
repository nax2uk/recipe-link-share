const routerApi = require("express").Router();
const {
    routerUser,
    routerLogin,
} = require("../routes");

//const { errStatus405, getApi } = require('../controllers/error');

//routerApi.route('/').get(getApi).all(errStatus405);
routerApi.use("/user", routerUser);
routerApi.use("/login", routerLogin);


module.exports = routerApi;
