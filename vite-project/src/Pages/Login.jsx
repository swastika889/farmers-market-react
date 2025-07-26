import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";


function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Modal toggle

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
        (user) => user.email === email && user.password === password
    );
    if (matchedUser) {
        localStorage.setItem("isLoggedIn", "true");
        onLogin();

        alert("Login successful!");
        navigate("/");

    } else {
        setError("Invalid email or password.");
    }
    
  };


  return (
   

    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2 className="login-title">LOG IN</h2>
        <div className="user-type-selection">
            <label>
                <input
                type="radio"
                name="userType"
                value="user"
                defaultChecked
                />
                User
                </label>
                <label>
                    <input
                    type="radio"
                    name="userType"
                    value="seller"
                    />
                    Seller
            </label>
        </div>

        {error && <p className="login-error">{error}</p>}

        <div className="input-group">
            <label className="login-label" htmlFor="email">Email</label>
            <input
            id="email"
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>

        <div className="input-group">
            <label className="login-label" html For="passwoord">Password</label>
            <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>

        <p className="forgot-password" onClick={() => setShowPopup(true)}>
            Forgot Password?
        </p>


        <button type="submit" className="login-button">
          Login
        </button>

        <div className ="signup-text">
            <span>Don't have an account? </span>
            <span className="signup-link" onClick={() => navigate("/signup")}>
                Sign up
            </span>
        </div>
      </form>
      {showPopup && (
        <div className="popup-overlay">
            <div className="popup-box">
                <h3>Reset Password</h3>
                <p>Please contact admin or check your email for reset instructions.</p>
                <button className="close-popup" onClick={() => setShowPopup(false)}>
                    Close
                </button>
            </div>
        </div>
      )}
    </div>
  );
}

export default Login;
