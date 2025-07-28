import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from localStorage or backend
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    setLoading(false);

    // Later replace with backend API fetch:
    /*
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
    */
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th><th>Name</th><th>Price</th><th>Category</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, price, category, stock }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>${price}</td>
              <td>{category}</td>
              <td>{stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
