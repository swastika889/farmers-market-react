import React, { useEffect, useState } from "react";
import "../Styles/CheckoutPage.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Ensure price is a number for calculation
      const priceNumber = parseFloat(item.price?.toString().replace(/[^\d.]/g, "")) || 0;
      return total + priceNumber * (item.quantity || 1);
    }, 0);
  };

  const handleConfirmOrder = () => {
    if (!address.trim() || !contact.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const orderDetails = {
      items: cartItems,
      deliveryAddress: address,
      contactNumber: contact,
      totalAmount: calculateTotal(),
    };

    localStorage.setItem("order", JSON.stringify(orderDetails));
    localStorage.removeItem("cartItems"); // clear cart storage

    setCartItems([]);
    setAddress("");
    setContact("");
    setOrderConfirmed(true);
  };

  const closePopup = () => {
    setOrderConfirmed(false);
    // You can also redirect or do something else here if needed
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
