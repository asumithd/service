const Fareclasses = require('../models/fareclasses.model.js');


exports.create = (req, res, next) => {
   
    const fareclasses = new Fareclasses(req.body); 
    fareclasses.save((err, data) => { 
        if (err) {
            const error = new Error('Some Error in fareclasses');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'fareclasses added successfully', data });
    })
}
  

exports.findAll = (req, res, next) => {
    Fareclasses.find().populate('category').populate('fareclasses').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in fareclasses');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'fareclasses fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Fareclasses.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in fareclasses');
            return next(error);
        }
        if (data.length) { 
            return res.json({ 'success': true, 'message': 'fareclasses fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'fareclasses with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => { 
    Fareclasses.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in fareclasses');
            return next(error);
        } else{
            return res.json({ 'success': true, 'message': 'fareclasses Updated Successfully', data });
        }
    })
};
 
exports.delete = (req, res, next) => {
    Fareclasses.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'fareclasses Deleted Successfully', data });
    })

}; 