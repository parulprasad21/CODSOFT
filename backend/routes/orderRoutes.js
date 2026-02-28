const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: "Pending"
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

router.post("/create-razorpay-order", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json(razorpayOrder);

  } catch (error) {
    res.status(500).json({ message: "Razorpay order failed" });
  }
});

router.put("/pay/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "Paid";
    order.paymentId = "PAY_" + Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: "Payment update failed" });
  }
});

module.exports = router;