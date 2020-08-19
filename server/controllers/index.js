const { errInvalidPaths, errStatus405 } = require("./error");
const { postLogin } = require("./login");
const { userRegister, userActivate, userProfile, userForgotPassword, userResetPassword } = require("./user");
const { postCategory, getAllCategories, getCategoryById, removeCategoryById, putCategoryById } = require('./category');
const { addLink, getAllLinks, getLinkBySlug, updateLinkBySlug, deleteLinkBySlug } = require('./link');

module.exports = {
    errStatus405, errInvalidPaths,
    postLogin,
    userRegister, userActivate, userProfile, userForgotPassword, userResetPassword,
    postCategory, getAllCategories, getCategoryById, removeCategoryById, putCategoryById,
    addLink, getAllLinks, getLinkBySlug, updateLinkBySlug, deleteLinkBySlug
};

