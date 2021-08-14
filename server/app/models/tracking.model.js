const mongoose = require('mongoose'); 
const Customer = require('./user.model');
const Driver = require('./driver.model'); 
const Order = require('./order.model');



const trackingSchema = mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Driver' }, 
    customer:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },     
    startlocation: Object,
    endlocation: Object,
    currentlocation: Object,
    status: { type: String, required: true, default: 'INPROGRESS' },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Tracking', trackingSchema);