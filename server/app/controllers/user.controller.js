const User = require('../models/user.model.js');
var passport = require('passport');
var mongoose = require('mongoose');


exports.register = function (req, res) {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'subadmin',
        privilege: req.body.privilegestr
    });
 

    User.findOne({ email: req.body.email })
        .then(userExists => {
            if (userExists) {
                return res.status(500).send({ 
                    message: "User already exists"
                });
            } else {
                user.setPassword(req.body.password);
                user.save(function (err) {
                    var token;
                    token = user.generateJwt();
                    res.status(200);
                    res.json({
                        "user": "admin",
                        "token": token
                    });
                });
            }
        });
};

// Find a single rideType with a rideTypeId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};


exports.login = function (req, res) {

    passport.authenticate('local', function (err, user, info) {
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
                "user": "admin",
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};


// Retrieve and return all users from the database.
exports.findAll = (req, res, next) => {
    User.find().exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in product');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'product fetched successfully', 'data': data });
    });
}


// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.userId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res, next) => {
    User.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error found in fetching user');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'user fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'user with the given id not found' });
        }
    });
};


exports.update = (req, res, next) => { 
    User.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error');
            return next(error);
        } else{
            return res.json({ 'success': true, 'message': 'Updated Successfully', data });
        }
    })
};
 