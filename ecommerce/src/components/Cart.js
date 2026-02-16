import { useNavigate } from "react-router-dom";

function Cart({ cart, updateQuantity }) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <strong>{item.name}</strong>
          <p>₹{item.price}</p>

          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          {item.quantity}
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        className="checkout"
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
