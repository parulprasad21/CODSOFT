import React, { useState } from "react";
import axios from "axios";
import Cart from "../components/Cart";

function Checkout({ cart, setCart }) {
  const [loading, setLoading] = useState(false);

  const updateQuantity = (_id, change) => {
    const updatedCart = cart
      .map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      alert("Please login first");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Order
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart,
          totalAmount: total,
          shippingAddress: "Default Address"
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      // 2️⃣ Simulate Payment Success
      await axios.put(
        `http://localhost:5000/api/orders/pay/${data._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      alert("Order Placed Successfully!");
      setCart([]);
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("Order failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Checkout
      </h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty.
        </p>
      ) : (
        <div>
          <Cart cart={cart} updateQuantity={updateQuantity} />

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f3f4f6",
              borderRadius: "10px"
            }}
          >
            <h3>Total Amount: ₹{total}</h3>
          </div>

          <button
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%"
            }}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;