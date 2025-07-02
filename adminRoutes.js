const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Admin login (simple example)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ message: "Admin logged in" });
  } else {
    res.status(400).json({ error: "Invalid admin credentials" });
  }
});

// Add product
router.post('/add-product', async (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.json({ message: "Product added!" });
});

// View all orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// View all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
