const mongoose = require('mongoose');
const Maincata = require('./maincata.model');
const Subcata = require('./subcategory.model');


const AttributesSchema = mongoose.Schema({
    label: String,
    option: Array,
});

module.exports = mongoose.model('Attributes', AttributesSchema);