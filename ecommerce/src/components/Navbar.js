import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setFilter, setIsLoggedIn }) {

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DESIKART</h2>

      <ul className="nav-links">
        <li onClick={() => setFilter("All")}>All</li>
        <li onClick={() => setFilter("Men")}>Men</li>
        <li onClick={() => setFilter("Women")}>Women</li>
        <li onClick={() => setFilter("Kids")}>Kids</li>
        <li onClick={() => setFilter("Accessories")}>Accessories</li>
        <li onClick={() => setFilter("Electronics")}>Electronics</li>
        <li onClick={() => setFilter("Footwear")}>Footwear</li>

        <li>
          <Link to="/checkout">Checkout</Link>
        </li>

        <li 
          onClick={handleLogout} 
          style={{ cursor: "pointer", color: "red" }}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;