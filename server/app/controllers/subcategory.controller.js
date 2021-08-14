const Subcata = require('../models/subcategory.model.js');
const Product = require('../models/product.model.js');


exports.create = (req, res, next) => {
    
    const subCat = new Subcata(req.body); 
    subCat.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in Category');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Category added successfully', data });
    })
}

  

exports.findAll = (req, res, next) => {
    Subcata.find().populate('category').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in subCategory');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'subCategory fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Subcata.find({ _id: req.params.id }).populate('category').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in subCategory');
            return next(error);
        }
        if (data.length) { 
            return res.json({ 'success': true, 'message': 'subCategory fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'subCategory with the given id not found' });
        }
    });
    
};
// exports.subCatfindAll = (req, res, next) => {
    
//     Subcata.find({ _id: req.params.id }).populate('category').exec((err, data) => {
//         if (err) {
//             const error = new Error('Some Error in subCategory');
//             return next(error);
//         }
//         if (data.length) { 
//             Product.find({ subcategory: data }).populate('category').exec((err, resdata) => {
//             return res.json({ 'success': true, 'message': 'subCategory fetched by id successfully', resdata });
//             });
//         } else {
//             return res.json({ 'success': false, 'message': 'subCategory with the given id not found' });
//         }
//     });
// }
exports.update = (req, res, next) => { 
    Subcata.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in subCategory');
            return next(error);
        } else{
            return res.json({ 'success': true, 'message': 'subCategory Updated Successfully', data });
        }
    })
};
 
exports.delete = (req, res, next) => {
    Subcata.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'subCategory Deleted Successfully', data });
    })

}; 