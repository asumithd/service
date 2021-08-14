const mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    userid: { type: String, required: true },
    fulladdress: { type: String, required: true },
    doorno: { type: String, required: true },
    addresstitle: {type: String, required: true},
    landmark: { type: String, required: true },
    coords: { type: [Number], index: '2d', default: [0, 0] },
    default: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('address', addressSchema);