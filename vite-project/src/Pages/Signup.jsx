// import React, { useState } from "react";
// import "../Styles/Login.css"; 
// import { useNavigate } from "react-router-dom";


// function Signup() {
//   const [userType, setUserType] = useState("student");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [securityAnswer, setSecurityAnswer] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const emailExists = users.find(user => user.email === email);
//     if (emailExists) {
//         setError("Email already registered.");
//         return;
//     }

//     const newUser = {
//         userType,
//         name,
//         email,
//         password,
//         securityAnswer
//     };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("Signup successful!");
//     setError("");
//     navigate("/login");


//   };

//   return (
//     <div className="login-container">
//       <form className="login-box" onSubmit={handleSignup}>
//         <h2 className="login-title">SIGN UP</h2>

//         <div className="user-type-selection">
//           <label>
//             <input
//               type="radio"
//               name="userType"
//               value="User"
//               checked={userType === "User"}
//               onChange={() => setUserType("User")}
//             />
//             User
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="userType"
//               value="admin"
//               checked={userType === "admin"}
//               onChange={() => setUserType("admin")}
//             />
//             Admin
//           </label>
//         </div>

//         {error && <div className="login-error">{error}</div>}

//         <div className="input-group">
//           <label className="login-label">Name</label>
//           <input
//             className="login-input"
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

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

//         <div className="input-group">
//           <label className="login-label">Confirm Password</label>
//           <input
//             className="login-input"
//             type="password"
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label className="login-label">Security Question: What is your favorite food/color?</label>
//           <input
//             className="login-input"
//             type="text"
//             placeholder="Answer"
//             value={securityAnswer}
//             onChange={(e) => setSecurityAnswer(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="login-button">Sign Up</button>
//         <div className="signup-text">
//         Already have an account?
//         <span className="signup-link" onClick={() => navigate("/Login")}>
//             Log in
//         </span>
//       </div>
//       </form>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [userType, setUserType] = useState("User");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Bakery",
    "Fruits",
    "Flowers",
    "Vegetables",
    "SoulFood",
    "Cheese",
  ];

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (userType === "admin" && !category) {
      setError("Please select a category for admin.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.find((user) => user.email === email);

    if (emailExists) {
      setError("Email already registered.");
      return;
    }

    const newUser = {
      userType,
      name,
      email,
      password,
      securityAnswer,
      category: userType === "admin" ? category : null,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    setError("");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSignup}>
        <h2 className="login-title">SIGN UP</h2>

        <div className="user-type-selection">
          <label>
            <input
              type="radio"
              name="userType"
              value="User"
              checked={userType === "User"}
              onChange={() => setUserType("User")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === "admin"}
              onChange={() => setUserType("admin")}
            />
            Admin
          </label>
        </div>

        {userType === "admin" && (
          <div className="input-group">
            <label className="login-label">Select Category</label>
            <select
              className="login-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Choose Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && <div className="login-error">{error}</div>}

        <div className="input-group">
          <label className="login-label">Name</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="input-group">
          <label className="login-label">Confirm Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label className="login-label">
            Security Question: What is your favorite food/color?
          </label>
          <input
            className="login-input"
            type="text"
            placeholder="Answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign Up
        </button>

        <div className="signup-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/Login")}>
            Log in
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
