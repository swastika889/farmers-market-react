
// import React from "react";

// function Vegetables() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Vegetables Page</h2>
//       <p>All Vegetables items here.</p>
//     </div>
//   );
// }

// export default Vegetables;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Bakery.css"; // Reuse same styles
import banner from "../assets/images/vegbanner.png"; // You need to have this image

import tomato from "../assets/images/tomato.png";
import potato from "../assets/images/potato.png";
import carrot from "../assets/images/carrot.png";
import onion from "../assets/images/onion.png";
import cucumber from "../assets/images/cucumber.png";
import broccoli from "../assets/images/broccoli.png";
import cabbage from "../assets/images/cabbage.png";
import cauliflower from "../assets/images/cauliflower.png";

const vegetableItems = [
  { name: "Tomato", image: tomato, price: 80 },
  { name: "Potato", image: potato, price: 60 },
  { name: "Carrot", image: carrot, price: 90 },
  { name: "Onion", image: onion, price: 100 },
  { name: "Cucumber", image: cucumber, price: 70 },
  { name: "Broccoli", image: broccoli, price: 120 },
  { name: "Cabbage", image: cabbage, price: 85 },
  { name: "Cauliflower", image: cauliflower, price: 110 },
];

function Vegetables() {
  const [quantities, setQuantities] = useState(Array(vegetableItems.length).fill(0));
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
    const selectedItems = vegetableItems
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
    <div className="bakery-container">
      <div className="banner">
        <img src={banner} alt="Vegetable Banner" className="banner-img" />
        <footer className="banner-footer">
          <p className="tagline">FARM FRESH</p>
          <p className="sub-tagline">Organic Goodness from Farm to Fork</p>
        </footer>
      </div>

      <div className="bakery-header">
        <button className="checkout-btn" onClick={handleCheckout}>Add To Cart</button>
        <h2 className="bakery-title">Vegetable Market</h2>
      </div>

      <div className="bakery-grid">
        {vegetableItems.map((item, index) => (
          <div className="bakery-card" key={index}>
            <img src={item.image} alt={item.name} className="bakery-image" />
            <h3 className="bakery-name">{item.name}</h3>
            <p className="bakery-price">{item.price}</p>

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

export default Vegetables;
