const mongoose = require('mongoose');
const Product = require('./product.model');
const Customer = require('./user.model');
const Driver = require('./driver.model');
const address = require('./address.model');


const orderSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
    locationid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'address' },
    deliverby: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Driver' },
    orders: { type: String, required: true },
    totalprice: { type: String, required: true },
    paymentmethod: { type: String, required: true },
    source: { type: String },
    chargeid: { type: String },
    transactionid: { type: String },
    notes: { type: String },
    rejectreason: { type: String },
    status: { type: String, required: true, default: 'PENDING' },
    restaurantstatus: { type: String, required: true, default: 'PENDING' },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);