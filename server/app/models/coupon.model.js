const mongoose = require('mongoose');

var couponSchema = mongoose.Schema({
    couponName: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    amount: { type: Number, required: true },
    couponType: { type: String, required: true },
    expiryDate: Date,
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);