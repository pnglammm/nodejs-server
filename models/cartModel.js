const mongoose = require('mongoose');
const cartItemSchema = require('./cartItemModel');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    items: {
        type: [cartItemSchema.schema]
    }
});
module.exports = mongoose.model('Cart', cartSchema);