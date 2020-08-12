const { errInvalidPaths, errStatus405 } = require("./error");
const { postLogin } = require("./login");
const { userRegister, userActivate, userProfile, userForgotPassword } = require("./user");

module.exports = {
    errStatus405,
    errInvalidPaths,
    postLogin,
    userRegister,
    userActivate,
    userProfile,
    userForgotPassword
};

