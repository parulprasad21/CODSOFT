const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // rupees to paisa
      currency: "INR",
      receipt: "receipt_order_1"
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};