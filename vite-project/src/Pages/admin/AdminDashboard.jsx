import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import ProductList from "./ProductList";
import OrderList from "./OrderList";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setProducts(storedProducts);
    setOrders(storedOrders);
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="admin-stats">
        <div className="admin-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="admin-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
      </div>

      <section className="admin-section">
        <h2>Manage Products</h2>
        <ProductList />
      </section>

      <hr />

      <section className="admin-section">
        <h2>Recent Orders</h2>
        <OrderList />
      </section>
    </div>
  );
}