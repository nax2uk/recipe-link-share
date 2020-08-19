const routerApi = require("express").Router();
const {
    routerUser,
    routerLogin,
    routerAdmin,
    routerCategory,
    routerLink
} = require("../routes");

routerApi.use("/user", routerUser);
routerApi.use("/login", routerLogin);
routerApi.use("/admin", routerAdmin);
routerApi.use("/category", routerCategory);
routerApi.use("/link", routerLink);

module.exports = routerApi;
