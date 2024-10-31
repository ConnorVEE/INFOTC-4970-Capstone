// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Conversations from './pages/Conversations.js';

// Import Components
import Products from './components/Products.js'
import Cart from './components/Cart.js'

// Import Context
import { AuthContext } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';

// Import Utils
import ProtectedRoute from './utils/ProtectedRoute.js';


//I cleaned up this routes page.
//We could always make a second "Routes file" to keep everyhting organized down the line if we keep adding to this
function App() {
  return (
    <CartProvider>

      <Router>

        <div>

          {/* NAVs don't go on login pages yah silly goofs  */}
          {/* <nav>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products">Products</Link>
            <Link to="/register">Register Here</Link>
          </nav> */}



          <Routes>

            <Route path="/" element={<ProtectedRoute element={Home} />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute element={Home} />} />
            <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
            <Route path="/products" element={<ProtectedRoute element={Products} />} />
            <Route path="/conversations" element={<ProtectedRoute> <Conversations /> </ProtectedRoute>} />

          </Routes>



        </div>

      </Router>

    </CartProvider>
  );
}

export default App;