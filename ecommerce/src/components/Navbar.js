import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setFilter }) {
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

        <Link to="/checkout">Checkout</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
