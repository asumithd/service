const mongoose = require('mongoose');

const fareclasses = require('./fareclasses.model');

var farerateSchema = mongoose.Schema({
    rate: { type: Number, required: true },
    faretype: { type: String, required: true },    
    fareclasses:  { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'fareclasses' },
    active: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now }
});
 
module.exports = mongoose.model('farerate', farerateSchema);