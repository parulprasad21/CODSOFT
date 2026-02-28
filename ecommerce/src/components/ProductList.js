function ProductList({ products, category, addToCart }) {
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="products">
      {filteredProducts.map((product) => (
        <div className="card" key={product._id}>
          <img
            src={`/images/${product.image}`}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;