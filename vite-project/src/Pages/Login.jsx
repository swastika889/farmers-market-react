
// import React, { useState } from "react";
// import "../Styles/Login.css";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const matchedUser = users.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (!matchedUser) {
//       setError("Invalid email or password.");
//       return;
//     }

//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
//     onLogin();

//     if (matchedUser.userType === "admin") {
//       navigate("/admin-dashboard");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-box" onSubmit={handleLogin}>
//         <h2 className="login-title">LOGIN</h2>

//         {error && <div className="login-error">{error}</div>}

//         <div className="input-group">
//           <label className="login-label">Email</label>
//           <input
//             className="login-input"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label className="login-label">Password</label>
//           <input
//             className="login-input"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="login-button">
//           Log In
//         </button>

//         <div className="signup-text">
//           Don't have an account?{" "}
//           <span className="signup-link" onClick={() => navigate("/signup")}>
//             Sign up
//           </span>
//         </div>

//         <div className="signup-text">
//           <span
//             className="signup-link"
//             onClick={() => navigate("/forgot-password")}
//           >
//             Forgot Password?
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Forgot Password popup states
  const [fpEmail, setFpEmail] = useState("");
  const [fpSecurityAnswer, setFpSecurityAnswer] = useState("");
  const [fpError, setFpError] = useState("");
  const [retrievedPassword, setRetrievedPassword] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    onLogin();

    if (matchedUser.userType === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setFpError("");
    setRetrievedPassword(null);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === fpEmail.toLowerCase() &&
        u.securityAnswer.toLowerCase() === fpSecurityAnswer.toLowerCase()
    );

    if (user) {
      setRetrievedPassword(user.password);
    } else {
      setFpError("Incorrect email or security answer.");
    }
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setFpEmail("");
    setFpSecurityAnswer("");
    setFpError("");
    setRetrievedPassword(null);
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="login-title">LOGIN</h2>

        {error && <div className="login-error">{error}</div>}

        <div className="input-group">
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>

        <div className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </div>

        <div className="signup-text">
          <span
            className="signup-link"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </span>
        </div>
      </form>

      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Forgot Password</h3>

            {!retrievedPassword ? (
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="input-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={fpEmail}
                    onChange={(e) => setFpEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>
                    Security Question: What is your favorite food/color?
                  </label>
                  <input
                    type="text"
                    value={fpSecurityAnswer}
                    onChange={(e) => setFpSecurityAnswer(e.target.value)}
                    required
                  />
                </div>
                {fpError && <p className="login-error">{fpError}</p>}
                <button type="submit">Retrieve Password</button>
                <button
                  type="button"
                  className="close-popup"
                  onClick={closeForgotPassword}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <p>
                  Your password is: <strong>{retrievedPassword}</strong>
                </p>
                <button onClick={closeForgotPassword}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
