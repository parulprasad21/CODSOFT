import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import "./styles/shop.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [cart, setCart] = useState([]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  if (!isLoggedIn) {
    return showSignup
      ? <Signup setShowSignup={setShowSignup} />
      : <Login setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} />;
  }

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <Home
            setIsLoggedIn={setIsLoggedIn}
            cart={cart}
            updateCart={updateCart}
          />
        }
      />

      {/* Protected Checkout */}
      <Route
        path="/checkout"
        element={
          cart.length === 0 ? (
            <Navigate to="/" />
          ) : (
            <Checkout cart={cart} updateCart={updateCart} />
          )
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
