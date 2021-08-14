const Product = require('../models/product.model.js');


exports.create = (req, res, next) => {

    const product = new Product(req.body);
    console.log(product)
    product.save((err, data) => {
        if (err) {
            console.log(err)
            const error = new Error('Some Error in product');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'product added successfully', data });
    })
}
exports.findbySubcategory = (req, res, next) => {

    Product.find({ subcategory: req.params.id }).populate('category').exec((err, resdata) => {
        return res.json({ 'success': true, 'message': 'product fetched by Subcategory successfully', resdata });
    });

}

exports.findAll = (req, res, next) => {
    Product.find().populate('category').populate('subcategory').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in product');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'product fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Product.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in product');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'product fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'product with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in product');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'product Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'product Deleted Successfully', data });
    })

};