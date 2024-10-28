import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom
import logo from '../components/MMLogo.png'; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="navbar">
       <div className="logo-container">
          <img src={logo} alt="Mizzou Marketplace Logo"  style={{ width: '200px', height: 'auto' }} className="navbar-logo" />
      </div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">Cart</Link></li>
        <li><Link to="/contact">Products</Link></li>
        <li><Link to="/login">Account</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
