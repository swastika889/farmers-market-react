import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", category: "Bakery", stock: "" });
  const categories = ["Bakery", "Fruits", "Flowers", "Vegetables", "Soulfood", "Cheese"];

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    setLoading(false);
  }, []);

  const saveProducts = (newProducts) => {
    localStorage.setItem("products", JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setForm({ name: "", price: "", category: "Bakery", stock: "" });
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    saveProducts(updatedProducts);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <form className="product-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
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
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
