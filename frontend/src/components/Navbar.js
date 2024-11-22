import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MizzouMarketplaceLogo from '../components/MMLogo.png';
import './Navbar.css';

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
                <li><Link to="/login" onClick={() => setIsOpen(false)}>Account</Link></li>
                <li><Link to="/account">Profile</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;
