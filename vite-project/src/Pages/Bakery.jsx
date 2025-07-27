import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // NEW
import "../Styles/Bakery.css";
import cake from "../assets/images/cake.png";
import croissant from "../assets/images/croissant.png";
import cupcake from "../assets/images/cupcake.png";
import donut from "../assets/images/donut.png";
import bread from "../assets/images/bread.png";
import banner from "../assets/images/bakerybanner.png";
import cheesecake from "../assets/images/cheesecake.png";
import cinnamonroll from "../assets/images/cinnamon.png";
import lemontart from "../assets/images/tart.png";

const bakeryItems = [
  { name: "Chocolate Cake", image: cake, price: "Rs. 450" },
  { name: "Croissant", image: croissant, price: "Rs. 120" },
  { name: "Cupcake", image: cupcake, price: "Rs. 80" },
  { name: "Donut", image: donut, price: "Rs. 100" },
  { name: "Bread Loaf", image: bread, price: "Rs. 160" },
  { name: "Cheese Cake", image: cheesecake, price: "Rs. 350" },
  { name: "Cinnamon Roll", image: cinnamonroll, price: "Rs 200" },
  { name: "Lemon Tart", image: lemontart, price: "Rs. 250" },
];

function Bakery() {
  const [quantities, setQuantities] = useState(Array(bakeryItems.length).fill(0));
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
    const selectedItems = bakeryItems
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


    // Store in localStorage or state management
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Redirect to Landing page
    navigate("/");
  };

  return (
    <div className="bakery-container">
      <div className="banner">
        <img src={banner} alt="Banner" className="banner-img" />
        <footer className="banner-footer">
            <p className="tagline">PATISSERIE</p>
            <p className="sub-tagline">Love At First Bite !</p>
          </footer>
      </div>

      <div className="bakery-header">
        <button className="checkout-btn" onClick={handleCheckout}>Add To Cart</button>
        <h2 className="bakery-title">Bake Shop</h2>
      </div>

      <div className="bakery-grid">
        {bakeryItems.map((item, index) => (
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

export default Bakery;
