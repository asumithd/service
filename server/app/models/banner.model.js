const mongoose = require('mongoose');

var bannerSchema = mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    image: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('banner', bannerSchema);