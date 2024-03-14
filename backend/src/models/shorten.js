const mongoose = require('mongoose');

const shortenSchema = new mongoose.Schema({
    shortenId: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        
    },
    userEmail: {
        type: String
    },
    userName: {
        type: String
    }
}, {timestamps: true});

const ShortenUrl= mongoose.model('ShortenUrl', shortenSchema);
module.exports = ShortenUrl;