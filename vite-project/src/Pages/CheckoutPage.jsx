import React, { useEffect, useState } from "react";
import "../Styles/CheckoutPage.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNumber = parseFloat(item.price?.toString().replace(/[^\d.]/g, "")) || 0;
      return total + priceNumber * (item.quantity || 1);
    }, 0);
  };

  const handleConfirmOrder = () => {
    if (!username.trim() || !address.trim() || !contact.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userName: username,
      items: cartItems,
      deliveryAddress: address,
      contactNumber: contact,
      totalAmount: calculateTotal(),
      date: new Date().toISOString(),
      status: "Pending",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cartItems");

    setCartItems([]);
    setUsername("");
    setAddress("");
    setContact("");
    setOrderConfirmed(true);
  };

  const closePopup = () => {
    setOrderConfirmed(false);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout Page</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>
                {item.name} × {item.quantity} — ₹
                {(parseFloat(item.price?.toString().replace(/[^\d.]/g, "")) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="total-section">
            Total: ₹{calculateTotal().toFixed(2)}
          </div>

          <div className="input-group">
            <label>User Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Delivery Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
            />
          </div>

          <div className="input-group">
            <label>Contact Number:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>

          <button className="confirm-button" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </>
      )}

      {orderConfirmed && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Order Confirmed!</h2>
            <p>✅ Thank you for ordering! You'll receive a call in a few hours.</p>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
