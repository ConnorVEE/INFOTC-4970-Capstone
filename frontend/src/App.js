import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Account from './pages/AccountPage.js';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Conversations from './pages/Conversations.js';
import Sell from './components/Sell';
import Products from './components/Products';
import ProtectedRoute from './utils/ProtectedRoute.js'
import Register from './pages/Register.js';
import { CartProvider } from './context/CartContext.js'; 
import ListingDetail from './components/ListingDetail';
import CreateListing from './components/CreateListing.js';
import CreateMessage from './components/CreateMessage.js';


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

          <Route path="/create-listing" element={
              <ProtectedRoute>
                  <CreateListing />
              </ProtectedRoute>
          } />

          <Route path="/conversations" element={
              <ProtectedRoute>
                  <Conversations />
              </ProtectedRoute>
          } />

          <Route path="/create-message" element={
            <ProtectedRoute>
              <CreateMessage />
            </ProtectedRoute>
          } />
        </Routes>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
