const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentStatus: {
    type: String,
    default: "Pending"   // Pending / Paid
  },
  paymentId: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);