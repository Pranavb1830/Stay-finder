const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    location: {
        type: String,
        required: [true, 'Please enter a location']
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description']
    },
    images: [String],
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);