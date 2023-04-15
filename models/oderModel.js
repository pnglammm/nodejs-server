const mongoose = require('mongoose');
const orderItemSchema = require('./orderItemModel');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: {type: [orderItemSchema.schema]},
    total: {
        type: Number,
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        require: true
    }
});
module.exports = mongoose.model('Order', orderSchema);