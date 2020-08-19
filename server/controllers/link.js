const Link = require('../models/link');
const slugify = require('slugify');

exports.addLink = (req, res) => {
    const { title, url, categories } = req.body;
    console.log({ title, url, categories })
}

exports.getAllLinks = (req, res) => {

}

exports.getLinkBySlug = (req, res) => {

}

exports.updateLinkBySlug = (req, res) => {

}

exports.deleteLinkBySlug = (req, res) => {

}

