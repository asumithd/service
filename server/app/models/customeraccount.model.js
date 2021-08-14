const mongoose = require('mongoose');
const Customer = require('./customer.model');

var customeraccountSchema = mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
    active: { type: Boolean, required: true, default: true },
    cardnumber: { type: String, required: true },
    expday: { type: String, required: true },
    expmonth: { type: String, required: true },
    expyear: { type: String, required: true },
    cvv: { type: String, required: true },
    cardholder: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('customeraccount', customeraccountSchema);