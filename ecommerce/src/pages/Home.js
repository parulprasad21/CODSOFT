import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import products from "../data";

function Home({ setIsLoggedIn, cart, updateCart }) {
  const [category, setCategory] = useState("All");

  const addToCart = (product) => {
    const found = cart.find((item) => item.id === product.id);

    if (found) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCart(updatedCart);
    } else {
      updateCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  return (
    <>
      <Navbar setFilter={setCategory} setIsLoggedIn={setIsLoggedIn} />
      <div className="main">
        <ProductList
          products={products}
          category={category}
          addToCart={addToCart}
        />
        <Cart cart={cart} updateQuantity={updateQuantity} />
      </div>
    </>
  );
}

export default Home;
