 
const mongoose = require('mongoose'); 

// const Maincata = require('./maincata.model');

var sitesettingsSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    logo: String,
    favicon: String,    
    name: String,
    seo: Object,
    facebook: String,
    twitter: String,
    instagram: String,
    bannervideo: String,
    videodisplay: Boolean,
    appid: {
        type: String,
        default: 'admin'
    }
}); 
 
module.exports = mongoose.model('sitesettings', sitesettingsSchema);