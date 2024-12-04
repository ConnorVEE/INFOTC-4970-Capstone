import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MizzouMarketplaceLogo from '../assets/MMLogo.png';
//import '../assets/Navbar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={MizzouMarketplaceLogo} alt="Mizzou Marketplace Logo" className="navbar-logo" />
                <h1>BUY AND SELL USED GOODS AT MIZZOU</h1>
            </div>

            {/* Hamburger icon for menu toggle */}
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>

            {/* Navbar items that appear vertically when open */}
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><Link to="/home" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setIsOpen(false)}>Cart</Link></li>
                <li><Link to="/conversations" onClick={() => setIsOpen(false)}>Messaging</Link></li>
                <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
                <li><Link to="/account" onClick={() => setIsOpen(false)}>Account</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
