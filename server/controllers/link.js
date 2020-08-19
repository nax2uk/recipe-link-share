const Link = require('../models/link');
const slugify = require('slugify');

exports.addLink = (req, res) => {
    const { title, url, categories, type } = req.body;
    //console.table({ title, url, categories });

    let link = new Link({ title, url, type });
    link.slug = url;
    link.postedBy = req.user._id;
    //let arrCategories = categories && categories.split(',');
    link.categories = categories && categories.split(',');

    link.save((err, data) => {

        if (err) return res.status(400).json({
            error: "Duplicate Link",
        })
        res.status(201).json(data)
    });
}

exports.getAllLinks = (req, res) => {
    Link.find({}).exec((err, data) => {
        if (err) return res.status(400).json({
            error: 'Error getting links.'
        })
        res.status(200).json(data)
    })
}

exports.getLinkBySlug = (req, res) => {

}

exports.updateLinkBySlug = (req, res) => {

}

exports.deleteLinkBySlug = (req, res) => {

}

