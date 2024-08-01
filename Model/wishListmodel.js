const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
  email: { type: String, required: true },
  image: { type: String },
  title: { type: String },
  aprice: { type: Number },
  pprice: { type: Number },
  savemoney: { type: Number },
  features: [String],
  rating: { type: Number },
  brand: { type: String }
});

module.exports = mongoose.model('wishlists', wishListSchema); // Ensure the model name is correct
