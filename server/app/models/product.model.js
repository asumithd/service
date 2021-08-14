const mongoose = require('mongoose'); 
const Maincata = require('./maincata.model');
const Subcata = require('./subcategory.model');


const ProductSchema = mongoose.Schema({
    name: String, 
    productCode: Number,
    description: String,
    stock: Number,
    price:Number,
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Maincata' },
    subcategory: { type: mongoose.Schema.Types.ObjectId,   ref: 'Subcata' },
    status: { type: Boolean, default: true },
    image: String,
    customizable: Boolean,
    variations: Array,
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Product', ProductSchema);