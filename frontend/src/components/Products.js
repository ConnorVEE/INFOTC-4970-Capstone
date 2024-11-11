// src/components/Products.js
// example product component
// should this be called it will add 1 item to cart.

import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.js'; // Ensure the correct path
import { Link } from 'react-router-dom';
import './styles/Products.css'

const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Furniture',
    'Sports',
    'Books',
];

const products = [
    { id: 1, name: 'Product 1', price: 10, category:'Electronics', image: "https://cdn.pixabay.com/photo/2024/01/21/20/09/ai-generated-8523907_640.png"},
    { id: 2, name: 'Product 2', price: 20, category:'Clothing', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_--e9z4i_m5j56h3lFlA-GBSkvEM4QHS5A&s"},
    { id: 3, name: 'Product 3', price: 30, category:'Furniture', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqp-yfvcN-oCMg0gS1BsfwfN9Sex-7VQHSEQ&s"},
];

const Products = () => {
    const { addToCart } = useContext(CartContext);
    const [activeCategory, setActiveCategory] = useState('All');
    
    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase());

    return (
        <div classname="products-container">
            <nav>
            <Link to="/home">Home</Link>
            <Link to="/login">Logout</Link>
            </nav>
            <h2>Products</h2>

            <div className="tabs">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`tab ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title} className="product-image" />
                        <div className="product-description">{product.description}</div>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;

