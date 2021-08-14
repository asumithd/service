const Banner = require('../models/banner.model.js');


exports.create = (req, res, next) => { 
    const banner = new Banner(req.body); 
    banner.save((err, data) => {  
        if (err) {
            const error = new Error('Some Error in banner');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'banner added successfully', data });
    })
}
  

exports.findAll = (req, res, next) => {
    Banner.find().populate('category').populate('banner').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in banner');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'banner fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Banner.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in banner');
            return next(error);
        }
        if (data.length) { 
            return res.json({ 'success': true, 'message': 'banner fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'banner with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => { 
    Banner.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in banner');
            return next(error);
        } else{
            return res.json({ 'success': true, 'message': 'banner Updated Successfully', data });
        }
    })
};
 
exports.delete = (req, res, next) => {
    Banner.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'banner Deleted Successfully', data });
    })

}; 