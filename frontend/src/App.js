// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import Products from './components/Products';
import { CartProvider } from './context/CartContext.js'; // Ensure this path is correct



//I cleaned up this routes page.
//We could always make a second "Routes file" to keep eveyrhting organized down the line if we keep adding to this
function App() {
  return (
    <CartProvider>

      <Router>

        <div>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products">Products</Link>
          </nav>



          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />

          </Routes>



        </div>

      </Router>

    </CartProvider>
  );
}

export default App;
