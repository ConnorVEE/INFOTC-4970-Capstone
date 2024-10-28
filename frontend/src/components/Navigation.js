import React from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products">Listings</Link>
            <Link to="/conversations">Conversations</Link>
        </nav>
    );
};

export default Navigation;