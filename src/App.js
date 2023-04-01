import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import Nutrition from "./components/Nutrition";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/nutrition" element={<Nutrition />} />
    </Routes>
  </Router>
  );
}

export default App;
