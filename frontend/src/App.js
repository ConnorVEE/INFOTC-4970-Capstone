// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login'; // Ensure this path is correct
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>

        <nav>
          {/*got rid of nav home/login here */}
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
          <Route path="/home" element={< Home />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
