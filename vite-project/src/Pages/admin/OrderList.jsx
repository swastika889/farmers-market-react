import React, { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div className="order-list">
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, userName, items, totalAmount, deliveryAddress, contactNumber, status, date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{userName}</td>
              <td>
                {items.map((item, i) => (
                  <div key={i}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>₹{totalAmount.toFixed(2)}</td>
              <td>{deliveryAddress}</td>
              <td>{contactNumber}</td>
              <td>{status}</td>
              <td>{date ? new Date(date).toLocaleString() : "No date"}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
