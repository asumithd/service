const mongoose = require('mongoose');
 

const PaymentMethodSchema = mongoose.Schema({
    paymentmode: [String],
    stripe: { 
        name: String,
        secretkey: String,
        key: String
     },
    createdAt: {
        type: Date, 
        default: Date.now
    },
 
});
 
module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);