const mongoose = require('mongoose');

var fareclassesSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    active: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now }
});
 
module.exports = mongoose.model('fareclasses', fareclassesSchema);