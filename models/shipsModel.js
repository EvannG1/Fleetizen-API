const mongoose = require('mongoose');

const ShipsModel = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    citizen_id: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('ships', ShipsModel);