const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed." });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Place order
router.post('/order', async (req, res) => {
  const { userId, address, products } = req.body;
  const order = new Order({ userId, address, products });
  await order.save();
  res.json({ message: "Order placed successfully!" });
});

// Get all orders (for admin or filtering)
router.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
