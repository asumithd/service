const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var expjwt = require('express-jwt');

const CustomerSchema = mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    hash: String,
    salt: String,
    role: String,
    uninum: Number,
    expiry: Number,
    verified: Boolean
}, {
    timestamps: true
});


var auth = expjwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


CustomerSchema.methods.setPassword = function(password) {
    console.log("Inside set password");
    this.salt = crypto.randomBytes(16).toString('hex');
    console.log("Salt" + this.salt);
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    console.log("Hash" + this.hash);
};

CustomerSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};



CustomerSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        mobile: this.mobile,
        username: this.username,
        verified: this.verified,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('Customer', CustomerSchema);