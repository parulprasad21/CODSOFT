const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
      // this will store image URL or image path
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Footwear",
        "Men",
        "Women",
        "Kids",
        "Accessories",
      ],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);