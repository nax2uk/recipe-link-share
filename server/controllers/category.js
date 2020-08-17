const Category = require('../models/category');
const slugify = require('slugify');

exports.getAllCategories = (req, res) => { }
//postCategory, getAllCategories, getCategoryById, removeCategoryById, putCategoryById
exports.getCategoryById = (req, res) => { }
exports.postCategory = (req, res) => {

    const { name, content } = req.body;
    const slug = slugify(name);
    const image = {
        url: `https://via.placeholder.com/200x150.png?text=${process.env.CLIENT_URL}`,
        key: '123'
    };
    console.log(req.user._id);
    const category = new Category({ name, slug, image, content });
    category.postedBy = req.user._id;


    category.save((err, data) => {
        if (err) {
            console.log('CATEGORY CREATE ERR', err)
            return res.status(400).json({
                error: 'Category create failed',
            })
        }
        return res.status(201).json(data);
    })


}
exports.putCategoryById = (req, res) => { }
exports.removeCategoryById = (req, res) => { }




