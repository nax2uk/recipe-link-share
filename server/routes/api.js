const routerApi = require("express").Router();
const {
    routerUser,
    routerLogin,
} = require("../routes");

routerApi.use("/user", routerUser);
routerApi.use("/login", routerLogin);


module.exports = routerApi;
