const Customer = require('../models/customer.model.js');
var passport = require('passport');
var mongoose = require('mongoose');
const https = require('https');

exports.userRegister = function(req, res) {
    // Validate request
    if (!req.body.username || !req.body.mobile || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    var user = new Customer({
        username: req.body.username,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        uninum: Math.floor(1000 + Math.random() * 9000),
        expiry: 0,
        verified: 0
    });


    Customer.findOne({ email: req.body.email } || { mobile: req.body.mobile })
        .then(userExists => {
            if (userExists) {
                return res.status(500).send({
                    message: "Customer already exists"
                });
            } else {
                user.setPassword(req.body.password);
                user.save(function(err) {
                    var token;
                    token = user.generateJwt();
                    res.status(200);
                    res.json({
                        "user": "customer",
                        "token": token
                    });
                });
            }
        });
};

exports.userLogin = function(req, res) {

    passport.authenticate('userLocal', function(err, user, info) {
        var token;
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "user": "customer",
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

exports.update = (req, res, next) => {
    if (req.body.password) {
        Customer.setPassword(req.body.password);
    }

    Customer.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, customer) => {
        if (err) {
            const error = new Error('Some Error');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'Updated Successfully', customer });
        }
    })
};



exports.getallCustomer = (req, res) => {
    Customer.find().exec((err, customer) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in fetching' });
        }

        return res.json({ 'success': true, 'message': 'Coupon fetched successfully', customer });
    });
}


exports.updateOTP = (req, res, next) => {
    Customer.findOne({ mobile: req.params.mobile }).exec((err, userExists) => {
        if (userExists) {
            console.log(userExists);
            let uniNumber = 9857;
            // let uniNumber = Math.floor(1000 + Math.random() * 9000);
            Customer.findByIdAndUpdate({ _id: userExists._id }, { $set: { uninum: uniNumber } }, { new: true }, (err, customer) => {
                if (err) {
                    console.log(err);
                    const error = new Error('Some Error');
                    return next(error);
                } else {
                    console.log(customer);
                    // this.sendOTP(customer);
                    return res.json({ 'success': true, 'message': 'Updated Successfully' });
                }
            })
        } else {
            return res.json({ 'success': false, 'message': 'Mobile number has not registered.' });
        }
    });
}

exports.sendOTP = function(req, res) {
    console.log(req);
    let dataUrl = "https://www.fast2sms.com/dev/bulk?authorization=GLsYtpcgzI4UmJZqe25xjv6S0CkndwTuByAr3bhEMV8ialFfP75jFiHZw7EtYfW4BQoXbsO9IadU8Nx1&sender_id=FSTSMS&language=english&route=qt&numbers=" + req.mobile + "&message=9506&variables={AA}&variables_values=" + req.uninum;
    https.get(dataUrl, (res) => {
        return res;
    }).on("error", (err) => {
        return res.json({ 'success': false, 'message': err.message });
    });
}