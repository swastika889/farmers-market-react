import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Fruits.css";
import apple from "../assets/images/apple.png";
import banana from "../assets/images/banana.png";
import mango from "../assets/images/mango.png";
import orange from "../assets/images/orange.png";
import grapes from "../assets/images/grapes.png";
import watermelon from "../assets/images/watermelon.png";
import papaya from "../assets/images/papaya.png";
import pineapple from "../assets/images/pineapple.png";
import fruitBanner from "../assets/images/fruit-banner.png"; // Replace with your fruit banner

const fruitItems = [
  { name: "Apple", image: apple, price: "Rs. 180" },
  { name: "Banana", image: banana, price: "Rs. 90" },
  { name: "Mango", image: mango, price: "Rs. 250" },
  { name: "Orange", image: orange, price: "Rs. 120" },
  { name: "Grapes", image: grapes, price: "Rs. 200" },
  { name: "Watermelon", image: watermelon, price: "Rs. 300" },
  { name: "Papaya", image: papaya, price: "Rs. 150" },
  { name: "Pineapple", image: pineapple, price: "Rs. 220" },
];

function Fruits() {
  const [quantities, setQuantities] = useState(Array(fruitItems.length).fill(0));
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
    const selectedItems = fruitItems
      .map((item, index) => ({
        ...item,
        quantity: quantities[index],
      }))
      .filter((item) => item.quantity > 0);

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const updatedCart = [...existingCart];

    selectedItems.forEach((newItem) => {
      const existingIndex = updatedCart.findIndex(
        (item) => item.name === newItem.name
      );

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
    <div className="fruit-container">
      <div className="fruit-banner">
        <img src={fruitBanner} alt="Fruit Banner" className="fruit-banner-img" />
        <footer className="fruit-banner-footer">
          <p className="tagline">FRUIT WORLD</p>
          <p className="sub-tagline">Nature's Candy Delivered Fresh!</p>
        </footer>
      </div>

      <div className="fruit-header">
        <button className="checkout-btn" onClick={handleCheckout}>Add To Cart</button>
        <h2 className="fruit-title">Fruit Shop</h2>
      </div>

      <div className="fruit-grid">
        {fruitItems.map((item, index) => (
          <div className="fruit-card" key={index}>
            <img src={item.image} alt={item.name} className="fruit-image" />
            <h3 className="fruit-name">{item.name}</h3>
            <p className="fruit-price">{item.price}</p>

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

export default Fruits;
