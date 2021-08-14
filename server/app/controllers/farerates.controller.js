const Farerates = require('../models/farerates.model.js');


exports.create = (req, res, next) => {
   
    const farerates = new Farerates(req.body); 
    farerates.save((err, data) => { 
        if (err) {
            const error = new Error('Some Error in farerates');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'farerates added successfully', data });
    })
}
  

exports.findAll = (req, res, next) => {
    Farerates.find().populate('fareclasses').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in farerates');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'farerates fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Farerates.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in farerates');
            return next(error);
        }
        if (data.length) { 
            return res.json({ 'success': true, 'message': 'farerates fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'farerates with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => { 
    Farerates.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in farerates');
            return next(error);
        } else{
            return res.json({ 'success': true, 'message': 'farerates Updated Successfully', data });
        }
    })
};
 
exports.delete = (req, res, next) => {
    Farerates.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'farerates Deleted Successfully', data });
    })

}; 