
import "../Styles/Landing.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



import banner from "../assets/images/banner.png";
import bakery from "../assets/images/bakery.png";
import cheese from "../assets/images/cheese.png";
import flowers from "../assets/images/flowers.png";
import vegetables from "../assets/images/vegetables.png";
import fruits from "../assets/images/fruits.png";
import soulfood from "../assets/images/soulfood.png";

function Landing( { isLoggedIn }) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [location, setLocation] = useState("");
{ /* add */}
    const handleCategoryClick = (category) => {
    if (!isLoggedIn) {
      alert("Login first!");
      return;
    }

    switch (category) {
      case "Bake Shop":
        navigate("/bakery");
        break;
      case "Himalayan Cheese":
        navigate("/cheese");
        break;
      case "Flower Shop":
        navigate("/flowers");
        break;
      case "Organic Vegetables":
        navigate("/vegetables");
        break;
      case "Fresh Fruits":
        navigate("/fruits");
        break;
      case "Soul Food":
        navigate("/soulfood");
        break;
      default:
        break;
    }
  };

  return (
    <div className="landing-page">
      <div className="banner">
        <img src={banner} alt="Banner" className="banner-img" />

        <div className="overlay">
          <header className="top-bar">
            {/* cart */}
            <div className="cart-icon" title="Cart">🛒</div>

            {/* Middle delivery text */}

            
            <div className="delivery-text" onClick={() => setShowLocationPopup(true)} style={{ cursor: "pointer"}}>
              📍Delivery To: <b>Choose your location ▼</b>
            </div>

            {/* right login button */}
            <button className="login-button" onClick={() => navigate("/login")}>
                Login
                </button>
          </header>

          <footer className="banner-footer">
            <p className="tagline">HARVESTING HEALTH, ONE BITE AT A TIME</p>
            <p className="sub-tagline">Enjoy Multi Cart Checkout Now!</p>
          </footer>
        </div>
      </div>

      <div className="category-section">
        <div className="category" onClick={() => handleCategoryClick('Bake Shop')}>
          <img src={bakery} alt="Bake Shop" />
          <p>Bake Shop</p>
        </div>
        <div className="category" onClick={() => handleCategoryClick('Himalayan Cheese')}>
          <img src={cheese} alt="Himalayan Cheese" />
          <p>Himalayan Cheese</p>
        </div>
        <div className="category" onClick={() => handleCategoryClick('Flower Shop')}>
          <img src={flowers} alt="Flower Shop" />
          <p>Flower Shop</p>
        </div>
        <div className="category" onClick={() => handleCategoryClick('Organic Vegetables')}>
          <img src={vegetables} alt="Organic Vegetables" />
          <p>Organic Vegetables</p>
        </div>
        <div className="category" onClick={() => handleCategoryClick('Fresh Fruits')}>
          <img src={fruits} alt="Fresh Fruits" />
          <p>Fresh Fruits</p>
        </div>
        <div className="category" onClick={() => handleCategoryClick('Soul Food')}>
          <img src={soulfood} alt="Soul Food" />
          <p>Soul Food</p>
        </div>
      </div>
      {showLocationPopup && (
        <div className="popup-overlay">
            <div className="popup-box">
                <span className="close-btn" onClick={() => setShowLocationPopup(false)}>×</span>
                <h3>Enter Delivery Location</h3>
                <input
                type="text"
                placeholder="Enter your address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={() => {
                    if (location.trim() === "") {
                        alert("Please enter a location.");
                        return;
                    }
                    alert(`Location saved: ${location}`);

                    setShowLocationPopup(false);
                }}>
                    Save 
                </button>

            </div>
        </div>
      )}
      

      <footer className="footer">
        <div className="footer-logo">FARMER MARKET</div>
        <p>
          Our Farmers Market brings together local farmers, artisans, and small
          businesses to offer fresh produce and home-made treats. It's more than
          just shopping — it's a place to connect with your community and support
          local.
        </p>
        <p>© All rights reserved. Farmers market</p>
      </footer>
    </div>
  );
}

export default Landing;
