import React from "react";
import { useNavigate } from "react-router-dom";

// function Login() {
//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Login Page</h2>
//       <p>This is where the login form will go.</p>
//     </div>
//   );
// }
function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    onLogin(); // ✅ sets isLoggedIn to true in App.jsx
    navigate("/"); // redirect back to landing
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
