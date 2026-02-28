import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import "./styles/shop.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) return;

      try {
        const res = await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        setCart(res.data.cartItems || []);
      } catch (error) {
        console.error("Cart load failed");
      }
    };

    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return showSignup ? (
      <Signup setShowSignup={setShowSignup} />
    ) : (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setShowSignup={setShowSignup}
      />
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            setIsLoggedIn={setIsLoggedIn}
            cart={cart}
            setCart={setCart}
          />
        }
      />

      <Route
        path="/checkout"
        element={
          cart.length === 0 ? (
            <Navigate to="/" />
          ) : (
            <Checkout cart={cart} setCart={setCart} />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;