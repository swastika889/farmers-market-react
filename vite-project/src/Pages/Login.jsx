// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Styles/Login.css";


// function Login({ onLogin }) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("user");
//   const [error, setError] = useState("");
//   const [showPopup, setShowPopup] = useState(false); 

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

//     const dataSource = userType === "user" ? users : sellers;

//     const matchedUser = users.find(
//         (user) => user.email === email && user.password === password
//     );
//     if (matchedUser) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("userType", userType);
//         localStorage.setItem("currentUser", JSON.stringify(matchedUser));

//         alert("Login successful!");
//         onLogin?.(); // Optional

//         navigate(userType === "user" ? "/" : "/admin-dashboard");
//     } else {
//         setError("Invalid email or password.");
//     }
    
//   };


//   return (
   

//     <div className="login-container">
//       <form onSubmit={handleLogin} className="login-box">
//         <h2 className="login-title">LOG IN</h2>
//         <div className="user-type-selection">
//             <label>
//                 <input
//                 type="radio"
//                 name="userType"
//                 value="user"
//                 checked={userType === "user"}
//                 onChange={(e) => setUserType(e.target.value)}
//                 />
//                 User
//                 </label>
//                 <label>
//                     <input
//                     type="radio"
//                     name="userType"
//                     value="seller"
//                     checked={userType === "seller"}
//                     onChange={(e) => setUserType(e.target.value)}
//                     />
//                     Seller
//             </label>
//         </div>

//         {error && <p className="login-error">{error}</p>}

//         <div className="input-group">
//             <label htmlFor="email" className="login-label">Email</label>            
//             <input
//             id="email"
//             type="email"
//             className="login-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             />
//         </div>

//         <div className="input-group">
//             <label htmlFor="password" className="login-label">Password</label>
//             <input
//             id="password"
//             type="password"
//             className="login-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             />
//         </div>

//         <p className="forgot-password" onClick={() => setShowPopup(true)}>
//             Forgot Password?
//         </p>


//         <button type="submit" className="login-button">
//           Login
//         </button>

//         <div className ="signup-text">
//             <span>Don't have an account? </span>
//             <span className="signup-link" onClick={() => navigate("/signup")}>
//                 Sign up
//             </span>
//         </div>
//       </form>
//       {showPopup && (
//         <div className="popup-overlay">
//             <div className="popup-box">
//                 <h3>Reset Password</h3>
//                 <p>Please contact admin or check your email for reset instructions.</p>
//                 <button className="close-popup" onClick={() => setShowPopup(false)}>
//                     Close
//                 </button>
//             </div>
//         </div>
//       )}
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
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
