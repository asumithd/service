
const Maincata = require('../models/maincata.model.js');


exports.create = (req, res, next) => {
    const mainCata = new Maincata(req.body);
    mainCata.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in Category');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Category added successfully', data });
    })
}


exports.findAll = (req, res, next) => { 
    Maincata.find().exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in the Category');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Category fetched successfully', 'data': data });
    });
}  

exports.findOne = (req, res, next) => {
    Maincata.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error found in Category');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'Category fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'Category with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => {
    Maincata.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in Category');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'Category Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Maincata.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Category Deleted Successfully', data });
    })

};

