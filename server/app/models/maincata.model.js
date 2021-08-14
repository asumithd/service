const mongoose = require('mongoose');

const MaincataSchema = mongoose.Schema({
    name: String,
    status: { type: Boolean, default: true },
    image: String, 
    createdAt: {
        type: Date, 
        default: Date.now
    },

});

module.exports = mongoose.model('Maincata', MaincataSchema);