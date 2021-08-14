
const Setting = require('../models/sitesetting.model.js');


exports.create = (req, res, next) => {
    const setting = new Setting(req.body);
    setting.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in Setting');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Setting added successfully', data });
    })
}


exports.findAll = (req, res, next) => { 
    Setting.find().exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in the Setting');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Setting fetched successfully', 'data': data });
    });
}  

exports.findOne = (req, res, next) => {
    Setting.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error found in Setting');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'Setting fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'Setting with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => { 
    Setting.updateOne({ _id: req.body._id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in Setting');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'Setting Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Setting.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Setting Deleted Successfully', data });
    })

};

