const Tracking = require('../models/tracking.model.js');
 

exports.create = (req, res, next) => {
    const tracking = new Tracking(req.body);
    tracking.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in tracking');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'tracking added successfully', data });
    })
}

exports.update = (req, res, next) => {
    Tracking.updateOne({ driver: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in tracking');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'tracking Updated Successfully', data });
        }
    })
};

exports.findOne = (req, res, next) => { 
    Tracking.find({ driver: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in tracking');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'tracking fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'tracking with the given id not found' });
        }
    });
};

exports.findAll = (req, res, next) => {
    Tracking.find().populate('locationid userid deliverby').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in tracking');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'tracking fetched successfully', 'data': data });
    });
}





 

exports.delete = (req, res, next) => {
    Tracking.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'tracking Deleted Successfully', data });
    })

};

exports.findByUser = (req, res, next) => { 
    Tracking.find({ userid: req.params.userid}).exec((err, data) => {
        if (err) {
            const error = new Error('Error in fetching trackings');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Trackings fetched successfully', 'data': data });
    });
}
