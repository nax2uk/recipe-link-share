const { errInvalidPaths, errStatus405 } = require("./error");
const { postLogin } = require("./login");
const { userRegister, userActivate } = require("./user");

module.exports = {
    errStatus405,
    errInvalidPaths,
    postLogin,
    userRegister,
    userActivate
};

