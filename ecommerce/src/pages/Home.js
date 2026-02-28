import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

function Home({ setIsLoggedIn, cart, setCart }) {
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add To Cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
  };

  // ✅ Update Quantity (+ / -)
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

  return (
    <>
      {/* ✅ Navbar with Logout */}
      <Navbar 
        setFilter={setCategory} 
        setIsLoggedIn={setIsLoggedIn} 
      />

      <div className="main">
        <ProductList
          products={products}
          category={category}
          addToCart={addToCart}
        />

        <Cart 
          cart={cart} 
          updateQuantity={updateQuantity} 
        />
      </div>
    </>
  );
}

export default Home;