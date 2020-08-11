const routerApi = require("express").Router();
const {
    routerUser,
    routerLogin,
    routerAuth,
} = require("../routes");

routerApi.use("/user", routerUser);
routerApi.use("/login", routerLogin);
routerApi.use("/auth", routerAuth);

module.exports = routerApi;
