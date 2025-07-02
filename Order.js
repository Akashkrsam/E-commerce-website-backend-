const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  address: String,
  products: [{ productId: String, quantity: Number }]
});

module.exports = mongoose.model('Order', orderSchema);
