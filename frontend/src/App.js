// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          {/* Route for default landing page */}
          <Route path="/" element={<Login />} />

          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />


          {/* TESTING AHHHAHAHHAHAHA */}

          {/* Route for the Register page */}
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Home Route (protected, later) */}
          <Route path="/home" element={<h1>Home Page (Protected)</h1>} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
