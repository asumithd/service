const Driver = require('../models/driver.model.js');
var passport = require('passport');
var mongoose = require('mongoose');


exports.register = function (req, res) {
    // Validate request
    if (!req.body.name || !req.body.mobile || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    } 

    var driver = new Driver(req.body);
    driver.role = 'driver';

    Driver.findOne({ email: req.body.email })
        .then(userExists => {
            if (userExists) {
                return res.status(500).send({
                    message: "Driver already exists"
                });
            } else {
                driver.setPassword(req.body.password);
                driver.save(function (err) {
                    var token;
                    // token = driver.generateJwt();
                    res.status(200);
                    res.json({
                        // "token": token
                        'data': 'create sucessfully'
                    });
                });
            }
        });
};

// Find a single rideType with a rideTypeId
exports.findOne = (req, res) => {
    Driver.findById(req.params.userId)
        .then(driver => {
            if (!driver) {
                return res.status(404).send({
                    message: "Driver not found with id " + req.params.userId
                });
            }
            res.send(driver);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Driver not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving driver with id " + req.params.userId
            });
        });
};


exports.login = function (req, res) {

    passport.authenticate('driver', function (err, driver, info) {
        var token;
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        // If a driver is found
        if (driver) {
            token = driver.generateJwt();
            res.status(200);
            res.json({
                "user": "driver",
                "token": token
            });
        } else {
            // If driver is not found
            res.status(401).json(info);
        }
    })(req, res);
};


// Retrieve and return all users from the database.
 


exports.findAll = (req, res) => { 
    Driver.find().exec((err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }

        return res.json({ 'success': true, 'message': 'Driver fetched successfully', data });
    });
}


// Delete a driver with the specified userId in the request
exports.delete = (req, res) => {
    Driver.findByIdAndRemove(req.params.userId)
        .then(driver => {
            if (!driver) {
                return res.status(404).send({
                    message: "Driver not found with id " + req.params.userId
                });
            }
            res.send({ message: "Driver deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Driver not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.userId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res, next) => {
    Driver.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error found in fetching driver');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'driver fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'driver with the given id not found' });
        }
    });
};


exports.update = (req, res, next) => { 
    Driver.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error');
            return next(error);
        } else{
            return res.json({ 'success': true, 'message': 'Updated Successfully', data });
        }
    })
};