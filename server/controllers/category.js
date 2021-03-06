const Category = require('../models/category');
const slugify = require('slugify');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// s3 config
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.getAllCategories = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err)
            return res.status(400).json({
                error: 'Categories could not load'
            });
        res.status(200).json(data);
    });
}

exports.getCategoryById = (req, res) => { }
exports.postCategory = (req, res) => {
    const { name, image, content } = req.body;
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const type = image.split(';')[0].split('/')[1];
    const slug = slugify(name);
    let category = new Category({ name, content, slug });

    //upload image to S3
    const params = {
        Bucket: 'recipes-nax2uk',
        Key: `category/${uuidv4()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }
    s3.upload(params, (err, data) => {
        if (err) {
            res.status(400).json({
                error: "Upload to S3 failed"
            })
        }
        console.log('AWS UPLOAD RES DATA', data);
        category.image.url = data.Location;
        category.image.key = data.Key;
        category.postedBy = req.user._id;

        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Duplicate category"
                })
                // please code delete image from bucket!!!!

            }
            return res.status(201).json(data);
        })
    })
}

exports.putCategoryById = (req, res) => { }
exports.removeCategoryById = (req, res) => { }




