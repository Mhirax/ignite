// src/App.js
import React from "react";
//Router
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // 👈 NEW IMPORT
import Home from "./pages/Home";
import GameDetail from "./components/GameDetail";
//styles
import GlobalStyles from "./components/GlobalStyles";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
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
