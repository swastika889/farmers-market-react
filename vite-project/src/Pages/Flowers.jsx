
// import React from "react";

// function Flowers() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Flowers Page</h2>
//       <p>All Flowers items here.</p>
//     </div>
//   );
// }

// export default Flowers;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Flowers.css";

// Flower images
import rose from "../assets/images/rose.png";
import tulip from "../assets/images/tulip.png";
import lily from "../assets/images/lily.png";
import sunflower from "../assets/images/sunflower.png";
import orchid from "../assets/images/orchid.png";
import marigold from "../assets/images/marigold.png";
import daisy from "../assets/images/daisy.png";
import flowersBanner from "../assets/images/flowersbanner.png"; // Make sure this exists

const flowerItems = [
  { name: "Rose", image: rose, price: 100 },
  { name: "Tulip", image: tulip, price: 90 },
  { name: "Lily", image: lily, price: 110 },
  { name: "Sunflower", image: sunflower, price: 80 },
  { name: "Orchid", image: orchid, price: 150 },
  { name: "Marigold", image: marigold, price: 70 },
  { name: "Daisy", image: daisy, price: 60 },
];

function Flowers() {
  const [quantities, setQuantities] = useState(Array(flowerItems.length).fill(0));
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
    const selectedItems = flowerItems
      .map((item, index) => ({
        ...item,
        quantity: quantities[index],
      }))
      .filter((item) => item.quantity > 0);

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const updatedCart = [...existingCart];

    selectedItems.forEach((newItem) => {
      const existingIndex = updatedCart.findIndex((item) => item.name === newItem.name);
      if (existingIndex !== -1) {
        updatedCart[existingIndex].quantity += newItem.quantity;
      } else {
        updatedCart.push(newItem);
      }
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    navigate("/");
  };

  return (
    <div className="flowers-container">
      <div className="banner">
        <img src={flowersBanner} alt="Flowers Banner" className="banner-img" />
        <footer className="banner-footer">
          <p className="tagline">BLOOMING BEAUTY</p>
          <p className="sub-tagline">Fragrance Delivered to Your Doorstep!</p>
        </footer>
      </div>

      <div className="flowers-header">
        <button className="checkout-btn" onClick={handleCheckout}>Add To Cart</button>
        <h2 className="flowers-title">Flower Shop</h2>
      </div>

      <div className="flowers-grid">
        {flowerItems.map((item, index) => (
          <div className="flowers-card" key={index}>
            <img src={item.image} alt={item.name} className="flowers-image" />
            <h3 className="flowers-name">{item.name}</h3>
            <p className="flowers-price">{item.price}</p>
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

export default Flowers;

