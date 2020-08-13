const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword
} = require('./userValidators');

const {
    validateAddCategory,
    validateUpdateCategory,
} = require('./categoryValidators');

module.exports = {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateAddCategory,
    validateUpdateCategory,
}