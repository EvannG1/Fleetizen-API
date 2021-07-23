const mongoose = require('mongoose');

const CitizensModel = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rsi_handle: {
        type: String,
        required: false
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('citizens', CitizensModel);