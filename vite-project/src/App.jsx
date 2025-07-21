import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Bakery from "./Pages/Bakery"; 
import Cheese from "./Pages/Cheese";
import Flowers from "./Pages/Flowers";
import Vegetables from "./Pages/Vegetables";
import SoulFood from "./Pages/SoulFood"; 
import Fruits from "./Pages/Fruits";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/cheese" element={<Cheese />} />
        <Route path="/flowers" elements={<Flowers />} /> 
        <Route path="/vegetables" element={<Vegetables />} /> 
        <Route path="/soulfood" element={<SoulFood />} />
        <Route path="/fruits" element={<Fruits />} />
        
        {/* Add more category routes here */}
      </Routes>
    </Router>
  );
}

export default App;
