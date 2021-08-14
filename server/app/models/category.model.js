const mongoose = require('mongoose');
 

const CategorySchema = mongoose.Schema({
    name: String,
    status: { type: Boolean, default: true },
    image: String, 
    createdAt: {
        type: Date, 
        default: Date.now
    },
 
});
 
module.exports = mongoose.model('Category', CategorySchema);