const Cart = require("../models/Cart");

// GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};