
const Payment = require('../models/paymentmethod.model.js');


exports.create = (req, res, next) => {
    const payment = new Payment(req.body);
    payment.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in Payment');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Payment added successfully', data });
    })
}


exports.findAll = (req, res, next) => { 
    Payment.find().exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in the Payment');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Payment fetched successfully', 'data': data });
    });
}  

exports.findOne = (req, res, next) => {
    Payment.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error found in Payment');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'Payment fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'Payment with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => { 
    Payment.updateOne({ _id: req.body._id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in Payment');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'Payment Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Payment.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Payment Deleted Successfully', data });
    })

};

