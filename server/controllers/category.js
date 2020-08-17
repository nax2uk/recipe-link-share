const Category = require('../models/category');
const slugify = require('slugify');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// s3 config
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.getAllCategories = (req, res) => { }
//postCategory, getAllCategories, getCategoryById, removeCategoryById, putCategoryById
exports.getCategoryById = (req, res) => { }

exports.postCategory = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not upload"
            })
        }
        //console.table({err, fields, files})
        const { name, content } = fields;
        const { image } = files;
        // restrict image to 2MB
        if (image.size > 2000000) {
            return res.status(400).json({
                error: "Image should be less than 2MB"
            })
        }
        const slug = slugify(name);
        let category = new Category({ name, content, slug });

        //upload image to S3
        const params = {
            Bucket: 'recipes-nax2uk',
            Key: `category/${uuidv4()}`,
            Body: image.path,
            ACL: 'public-read',
            ContentType: 'image/jpg'
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

            category.save((err, data) => {
                if (err) return res.status(400).json({
                    error: "Error saving category to database"
                })
                return res.status(201).json(data);
            })
        })


    })

    // const { name, content } = req.body;
    // const slug = slugify(name);
    // const image = {
    //     url: `https://via.placeholder.com/200x150.png?text=${process.env.CLIENT_URL}`,
    //     key: '123'
    // };
    // console.log(req.user._id);
    // const category = new Category({ name, slug, image, content });
    // category.postedBy = req.user._id;
    // category.save((err, data) => {
    //     if (err) {
    //         console.log('CATEGORY CREATE ERR', err)
    //         return res.status(400).json({
    //             error: 'Category create failed',
    //         })
    //     }
    //     return res.status(201).json(data);
    // })


}
exports.putCategoryById = (req, res) => { }
exports.removeCategoryById = (req, res) => { }




