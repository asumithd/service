const mongoose = require('mongoose'); 
const Maincata = require('./maincata.model');

const SubcategorySchema = mongoose.Schema({
    name: String, 
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Maincata' },
    status: { type: Boolean, default: true },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Subcata', SubcategorySchema);