const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    addemail: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true }, // Remove unique constraint
    phone: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    aprice: { type: Number, required: true },
    pprice: { type: Number, required: true },
    savemoney: { type: String, required: true },
    features: { type: [String], required: true },
    rating: { type: Number, required: true },
    brand: { type: String, required: true }
});

const OrderModel = mongoose.model('orders', orderSchema);

module.exports = OrderModel;
