// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Conversations from './pages/Conversations.js';
import Cart from './components/Cart';
import Sell from './components/Sell';
import Products from './components/Products';
import ProtectedRoute from './utils/ProtectedRoute.js';
import Register from './pages/Register.js';


//I cleaned up this routes page.
//We could always make a second "Routes file" to keep everyhting organized down the line if we keep adding to this
function App() {
  return (
    <CartProvider>

      <Router>

        <div>

        <nav>
          {/*got rid of nav home/login here */}
        </nav>

        <Routes>
          <Route path="/" element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
          } />

          <Route path="/sell" element={
              <ProtectedRoute>
                  <Sell />
              </ProtectedRoute>
          } />

          <Route path="/cart" element={
              <ProtectedRoute>
                  <Cart />
              </ProtectedRoute>
          } />

          <Route path="/conversations" element={
              <ProtectedRoute>
                  <Conversations />
              </ProtectedRoute>
          } />

          <Route path="/products" element={
              <ProtectedRoute>
                  <Products />
              </ProtectedRoute>
          } />
</Routes>




        </div>

      </Router>

    </CartProvider>
  );
}

export default App;
