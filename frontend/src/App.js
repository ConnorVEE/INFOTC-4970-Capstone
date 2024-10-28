import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Import Pages 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Conversations from "./pages/Conversations";

// Import Components
import Cart from "./components/Cart";
import Products from "./components/Products";
import Navigation from "./components/Navigation";

// Import Utils and Context
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";


//I cleaned up this routes page.
//We could always make a second "Routes file" to keep everyhting organized down the line if we keep adding to this
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            < Navigation />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={< Login />} />
              <Route path="/login" element={< Login />} />
              <Route path="/products" element={< Products />} />

              {/* Protected Routes */}
              <Route 
                path="/home"
                element={
                  <ProtectedRoute>
                    < Home />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/cart"
                element={
                  <ProtectedRoute>
                    < Cart />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/conversations"
                element={
                  <ProtectedRoute>
                    < Conversations />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;