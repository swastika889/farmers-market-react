
// import React from "react";

// function SoulFood() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>SoulFood Page</h2>
//       <p>All SoulFood items here.</p>
//     </div>
//   );
// }

// export default SoulFood;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SoulFood.css"; // You can style it similar to Bakery.css but unique colors/images

import soulfoodBanner from "../assets/images/soulfood-banner.png"; // Add your soulfood banner image
import vegbowl from "../assets/images/vegbowl.png";
import chickenbowl from "../assets/images/chickenbowl.png";
import chickenricebowl from "../assets/images/chickenricebowl.png";
import chickenshawarma from "../assets/images/chickenshawarma.png";
import falafelwrap from "../assets/images/falafelwrap.png";
import burritosupreme from "../assets/images/burritosupreme.png";
import grilledsandwich from "../assets/images/grilledsandwich.png";
import pestosandwich from "../assets/images/pestosandwich.png";
import chickensandwich from "../assets/images/chickensandwich.png";


const soulfoodItems = [
  {
    name: "Veg Mexican Burrito Bowl",
    image: vegbowl,
    price: 300,
    description: "A wholesome bowl of rice, beans, veggies, and salsa.",
    type: "veg"
  },
  {
    name: "Chicken Mexican Burrito Bowl",
    image: chickenbowl,
    price: 350,
    description: "Spicy grilled chicken served on a bed of Mexican rice and beans.",
    type: "nonveg"
  },
  {
    name: "Chicken Shawarma Rice Bowl",
    image: chickenricebowl,
    price: 330,
    description: "Middle Eastern flavors served with seasoned chicken and rice.",
    type: "nonveg"
  },
  {
    name: "Cheese Chicken Shawarma",
    image: chickenshawarma,
    price: 280,
    description: "Juicy chicken shawarma wrapped in a cheesy flatbread.",
    type: "nonveg"

  },
  {
    name: "Falafel Cheese Wrap",
    image: falafelwrap,
    price: 250,
    description: "Crispy falafel and melty cheese in a warm wrap.",
    type: "veg"
  },
  {
    name: "Supreme Chicken Burrito",
    image: burritosupreme,
    price: 370,
    description: "Loaded burrito with chicken, rice, beans, salsa, and cheese.",
    type: "nonveg"

  },
  {
    name: "Rustic Veggie Melt",
    image: grilledsandwich,
    price: 220,
    description: "A hearty sandwich with grilled veggies and house sauces.",
    type: "veg"
  },
  {
    name: "Mozzarella Pesto Melt Toast",
    image: pestosandwich,
    price: 240,
    description: "Fresh mozzarella with basil pesto on toasted bread.",
    type: "veg"
  },
  {
    name: "Grilled Chicken Cheese Sandwich",
    image: chickensandwich,
    price: 260,
    description: "Tender grilled chicken and cheese in a crispy sandwich.",
    type: "nonveg"

  },
];

function SoulFood() {
  const [quantities, setQuantities] = useState(Array(soulfoodItems.length).fill(0));
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
    const selectedItems = soulfoodItems
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
    <div className="soulfood-container">
      <div className="banner">
        <img src={soulfoodBanner} alt="Soulfood Banner" className="banner-img" />
        <footer className="banner-footer">
          <p className="tagline">Soulfood Delights</p>
          <p className="sub-tagline">Flavorful, Filling, Fantastic!</p>
        </footer>
      </div>

      <div className="bakery-header">
        <button className="checkout-btn" onClick={handleCheckout}>Add To Cart</button>
        <h2 className="bakery-title">Soulfood Menu</h2>
      </div>

      <div className="bakery-grid">
        {soulfoodItems.map((item, index) => (
          <div className="bakery-card" key={index}>
            <img src={item.image} alt={item.name} className="bakery-image" />
            <h3 className="bakery-name">
               
                {item.name}

            </h3>
            <span className={`food-indicator ${item.type}`}>
                    <span className="dot"></span>
                </span>
            <p className="bakery-price">{item.price}</p>
            <p className="item-description">{item.description}</p>

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

export default SoulFood;
