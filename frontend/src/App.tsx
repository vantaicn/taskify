import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardsPage from "./pages/BoardsPage";
import BoardDetailsPage from "./pages/BoardDetailsPage";

const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/boards/:id" element={<BoardDetailsPage />} />
      {/* Add more routes as needed */}
      <Route path="/" element={<div>Welcome to Taskify!</div>} />
    </Routes>
  )
}

export default App;
