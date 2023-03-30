import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import Nutrition from "./components/Nutrition";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/nutrition" component={Nutrition} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
