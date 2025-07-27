// Example: Bakery.jsx
// import React from "react";

// function Cheese() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Cheese Page</h2>
//       <p>All Cheese items here.</p>
//     </div>
//   );
// }

// export default Cheese;
import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; // NEW
import "../Styles/Cheese.css";
import cheddar from "../assets/images/cheddar.png";
import mozzarella from "../assets/images/mozzarella.png";
import gouda from "../assets/images/gouda.png";
import brie from "../assets/images/brie.png";
import cheesebanner from "../assets/images/cheesebanner.png";

const cheeseItems = [
  { name: "Cheddar", image: cheddar, price: "Rs. 300" },
  { name: "Mozzarella", image: mozzarella, price: "Rs. 280" },
  { name: "Gouda", image: gouda, price: "Rs. 320" },
  { name: "Brie", image: brie, price: "Rs. 350" },
];

function Cheese() {
  const [quantities, setQuantities] = useState(Array(cheeseItems.length).fill(0));
  const navigate = useNavigate();

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };

  const handleCheckout = () => {
    const selectedItems = cheeseItems
      .map((item, index) => ({
        ...item,
        quantity: quantities[index],
      }))
      .filter((item) => item.quantity > 0);
      // 1. Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // 2. Merge: If item already exists (by name), update quantity
    const updatedCart = [...existingCart];

    selectedItems.forEach((newItem) => {
        const existingIndex = updatedCart.findIndex(
        (item) => item.name === newItem.name
        );

        if (existingIndex !== -1) {
        // If already in cart, add quantity
        updatedCart[existingIndex].quantity += newItem.quantity;
        } else {
        // If not in cart, add it
        updatedCart.push(newItem);
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    navigate("/");
  };

  return (
    <div className="cheese-container">
      <div className="banner">
        <img src={cheesebanner} alt="Cheese Banner" className="banner-img" />
        <footer className="banner-footer">
            <p className="tagline">HARVESTING HEALTH, ONE BITE AT A TIME</p>
            <p className="sub-tagline">Enjoy Multi Cart Checkout Now!</p>
          </footer>
      </div>

      <div className="cheese-header">
        <button className="checkout-btn" onClick={handleCheckout}>Add To Cart</button>
        <h2 className="cheese-title">Cheese Corner</h2>
      </div>

      <div className="cheese-grid">
        {cheeseItems.map((item, index) => (
          <div className="cheese-card" key={index}>
            <img src={item.image} alt={item.name} className="cheese-image" />
            <h3 className="cheese-name">{item.name}</h3>
            <p className="cheese-price">{item.price}</p>

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <span>{quantities[index]}</span>
              <button onClick={() => increaseQuantity(index)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cheese;
