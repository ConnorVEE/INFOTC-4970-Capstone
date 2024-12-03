// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Account from './components/AccountPage.js';
import Login from './pages/Login';
import Home from './pages/Home';
import Conversations from './Pages/Conversations.js';
import Cart from './components/Cart';
import Sell from './components/Sell';
import Products from './components/Products';
import ProtectedRoute from './components/ProtectedRoute.js';
import Register from './components/Register.js';
import { CartProvider } from './context/CartContext.js'; 
import ListingDetail from './components/ListingDetail';
import CreateListing from './components/CreateListing.js'


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <nav>
            {/*got rid of nav home/login here */}
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sell"
              element={
                <ProtectedRoute>
                  <Sell />
                </ProtectedRoute>
              }
            />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
              </ProtectedRoute>
          } />

          <Route path="/listing/:id" element={
              <ProtectedRoute>
                  <ListingDetail />
              </ProtectedRoute>
          } />

          <Route path="/conversations" element={
              <ProtectedRoute>
                  <Conversations />
              </ProtectedRoute>
          } />

          <Route path="/create-listing" element={
              <ProtectedRoute>
                  <CreateListing />
              </ProtectedRoute>
          } />
        </Routes>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
