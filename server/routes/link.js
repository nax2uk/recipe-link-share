const routerLink = require('express').Router();

// validators
const { validateAddLink, validateUpdateLink } = require('../utils/formValidators/linkValidators');

//middlewares
const { runValidation, requireLogin, userMiddleware } = require('../middlewares');

// controllers
const { addLink, getAllLinks, getLinkBySlug, updateLinkBySlug, deleteLinkBySlug, errStatus405 } = require('../controllers');

// routes
routerLink
    .route('/')
    .post(validateAddLink, runValidation, requireLogin, userMiddleware, addLink)
    .get(getAllLinks)
    .all(errStatus405);

routerLink.route('/:slug')
    .get(getLinkBySlug)
    .put(validateUpdateLink, runValidation, requireLogin, userMiddleware, updateLinkBySlug)
    .delete(requireLogin, userMiddleware, deleteLinkBySlug)
    .all(errStatus405);

module.exports = routerLink;