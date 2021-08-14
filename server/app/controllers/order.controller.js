const Order = require('../models/order.model.js');

const keySecret = 'sk_test_KDzTh4Am9tg70GvcqynpMmky';

// import and create stripe object
const stripe = require("stripe")(keySecret);


exports.create = (req, res, next) => {
    const order = new Order(req.body);
    console.log(req.body)

    order.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in order');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'order added successfully', data });
    })
}


exports.findAll = (req, res, next) => {
    Order.find().populate('locationid userid deliverby').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in order');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'order fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Order.find({ userid: req.params.id }).populate('locationid').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in order');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'order fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'order with the given id not found' });
        }
    });
};



exports.driverorder = (req, res, next) => {
    Order.find({ deliverby: req.params.id }).populate('locationid deliverby userid').exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in order');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'order fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'order with the given id not found' });
        }
    });
};
exports.update = (req, res, next) => {
    Order.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in order');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'order Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Order.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'order Deleted Successfully', data });
    })

};

exports.findByUser = (req, res, next) => {
    Order.find({ userid: req.params.userid }).exec((err, data) => {
        if (err) {
            const error = new Error('Error in fetching orders');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Orders fetched successfully', 'data': data });
    });
}

exports.makePayment = (req, res, next) => {
    let currency = req.body.currency;
    let amount = req.body.amount;
    // create a customer 
    stripe.customers.create({
        email: "vino@gmail.com", // customer email, which user need to enter while making payment
        source: req.body.stripeToken // token for the given card 
    }).then(customer =>
        stripe.charges.create({ // charge the customer
            amount,
            description: "Sample Charge",
            currency: currency,
            customer: customer.id
        })).then(charge => saveCharge(charge, req, res));
}


function saveCharge(payRes, req, res) {
    console.log(req);
    let orderDetails = {};
    let amount = req.body.amount;
    if (payRes) {
        orderDetails.transactionid = payRes.balance_transaction;
        orderDetails.source = JSON.stringify(payRes.source);
        orderDetails.chargeid = payRes.id;
    }
    orderDetails.userid = req.body.userid;
    orderDetails.locationid = req.body.locationid;
    orderDetails.orders = req.body.orderList;
    orderDetails.totalprice = amount;
    orderDetails.paymentmethod = req.body.paymentType;
    orderDetails.deliverby = req.body.userid;
    const order = new Order(orderDetails);
    order.save((err, data) => {
        if (err) {
            console.log(err);
            const error = new Error('Some Error in order');
            return res.json({ 'success': false, 'message': 'order Failed', err });
        }
        console.log(data);
        return res.json({ 'success': true, 'message': 'order added successfully', data });
    });
}

exports.createOrder = (req, res, next) => {
    console.log("COD");
    let orderDetails = {};
    let amount = req.body.amount;
    orderDetails.userid = req.body.userid;
    orderDetails.locationid = req.body.locationid;
    orderDetails.orders = req.body.orderList;
    orderDetails.totalprice = amount;
    orderDetails.paymentmethod = req.body.paymentType;
    orderDetails.deliverby = req.body.userid;
    orderDetails.notes = req.body.notes;

    const order = new Order(orderDetails);
    order.save((err, data) => {
        if (err) {
            console.log(err);
            const error = new Error('Some Error in order');
            return res.json({ 'success': false, 'message': 'order Failed', err });
        }
        console.log(data);
        return res.json({ 'success': true, 'message': 'order added successfully', data });
    });
}