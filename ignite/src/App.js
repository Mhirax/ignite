// src/App.js
import React from "react";
//Router
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // 👈 NEW IMPORT
import Home from "./pages/Home";
import GameDetail from "./components/GameDetail";
import Nav from "./components/Nav";
//styles
import "./styles/App.scss" // ← Import global style

function App() {
  return (
    <div className="App">
      <Nav />
      {/* 👇 Wrap Routes in AnimatePresence */}
      <AnimatePresence mode="wait">     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
