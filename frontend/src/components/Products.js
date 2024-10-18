// src/components/Products.js
// example product component
// should this be called it will add 1 item to cart.

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js'; // Ensure the correct path

const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
];

const Products = () => {
    const { addToCart } = useContext(CartContext);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;

