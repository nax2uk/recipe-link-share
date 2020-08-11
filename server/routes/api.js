const routerApi = require("express").Router();
const {
    routerUser,
    routerLogin,
    routerAdmin
} = require("../routes");

routerApi.use("/user", routerUser);
routerApi.use("/login", routerLogin);
routerApi.use("/admin", routerAdmin);

module.exports = routerApi;
