const routerApi = require("express").Router();
const {
    routerUser,
    routerLogin,
    routerAdmin,
    routerCategory
} = require("../routes");

routerApi.use("/user", routerUser);
routerApi.use("/login", routerLogin);
routerApi.use("/admin", routerAdmin);
routerCategory.use("/category", routerCategory);

module.exports = routerApi;
