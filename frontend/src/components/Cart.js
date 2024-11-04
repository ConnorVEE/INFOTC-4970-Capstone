// src/components/Cart.js
// displaying cart on screen
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js'; // Ensure the correct path
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext); // Use 'cart' instead of 'cartItems'

    return (
        <div>
            <nav>
                <Link to='/home'>Back</Link>
            </nav>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;

