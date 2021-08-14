const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var expjwt = require('express-jwt');

const DriverSchema = mongoose.Schema({
    address: String, 
    city: String,
    country: String,
    email: String,
    location: String,
    mobile: String,
    name: String,
    image: String,    
    hash: String,
    salt: String,
    postalcode: String,
    state: String,
    hash: String,
    salt: String,
    role: String,
    privilege: String, 
 },{
        timestamps: true
    });


var auth = expjwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


DriverSchema.methods.setPassword = function (password) { 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); 
};

DriverSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

DriverSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        mobile: this.mobile,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('Driver', DriverSchema);