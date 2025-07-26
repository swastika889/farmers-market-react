import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Bakery from "./Pages/Bakery"; 
import Cheese from "./Pages/Cheese";
import Flowers from "./Pages/Flowers";
import Vegetables from "./Pages/Vegetables";
import SoulFood from "./Pages/SoulFood"; 
import Fruits from "./Pages/Fruits";
import { Navigate } from "react-router-dom";




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bakery" element={ isLoggedIn ? <Bakery /> : <Navigate to="/Login" replace />} />
        <Route path="/cheese" element={<Cheese />} />
        <Route path="/flowers" element={<Flowers />} /> 
        <Route path="/vegetables" element={<Vegetables />} /> 
        <Route path="/soulfood" element={<SoulFood />} />
        <Route path="/fruits" element={<Fruits />} />
    
      </Routes>
    </Router>
  );
}

export default App;
