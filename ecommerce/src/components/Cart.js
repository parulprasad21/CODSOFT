import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = async (productId, change) => {
    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + change }
        : item
    ).filter(item => item.quantity > 0);

    setCart(updatedCart);

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { cartItems: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
    } catch (error) {
      console.error("Cart update failed");
    }
  };

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