const Attributes = require('../models/attributes.model.js');


exports.create = (req, res, next) => {
    const attributes = new Attributes(req.body);
    attributes.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in attributes');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'attributes added successfully', data });
    })
}


exports.findAll = (req, res, next) => {
    Attributes.find().exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in attributes');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'attributes fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Attributes.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in attributes');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'attributes fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'attributes with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => {
    Attributes.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in attributes');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'attributes Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Attributes.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'attributes Deleted Successfully', data });
    })

};