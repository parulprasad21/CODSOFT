import React from "react";
import Cart from "../components/Cart";

function Checkout({ cart, updateCart }) {

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // ✅ Calculate total here
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    alert("Payment integration will be added later 😄");
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

          {/* Cart Items */}
          <Cart cart={cart} updateQuantity={updateQuantity} />

          {/* Order Summary */}
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f3f4f6",
            borderRadius: "10px"
          }}>
            <h3>Total Amount: ₹{total}</h3>
          </div>

          {/* Payment Button */}
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
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>

        </div>
      )}
    </div>
  );
}

export default Checkout;
