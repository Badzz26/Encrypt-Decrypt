import React from "react";
import Caesar from "./components/Ceasar cipher/caesar/Caesar";
import Hill from "./components/Hill cipher/hill/Hill";
import Playfair from "./components/Playfair cipher/playfair/Playfair";
import Vigenere from "./components/Vigenere cipher/vigenere/Vigenere";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/navbar/Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Caesar />} className="home" />
            <Route path="/Caesar" element={<Caesar />} className="caesar" />
            <Route
              path="/Playfair"
              element={<Playfair />}
              className="playfair"
            />
            <Route path="/Hill" element={<Hill />} className="hill" />
            <Route
              path="/Vigenere"
              element={<Vigenere />}
              className="vigenere"
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
