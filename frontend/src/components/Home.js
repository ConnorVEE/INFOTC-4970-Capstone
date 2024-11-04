import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Simulating fetching products
        const fetchedProducts = [
            { id: 1, name: 'Product 1', price: "$10", image: "https://cdn.pixabay.com/photo/2024/01/21/20/09/ai-generated-8523907_640.png" },
            { id: 2, name: 'Product 2', price: "$20", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_--e9z4i_m5j56h3lFlA-GBSkvEM4QHS5A&s" },
            { id: 3, name: 'Product 3', price: "$30", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqp-yfvcN-oCMg0gS1BsfwfN9Sex-7VQHSEQ&s" },
        ];
        setProducts(fetchedProducts);
    }, []);

    return (
        <div className="home-container">
            <h1>Mizzou Marketplace</h1>

            <nav>
            {/* Conditional rendering based on authentication state */}
            {isAuthenticated ? (
                 <button className="button2" type="button" onClick={logout}>Logout</button>
                 ) : (
                     <>
                        <Link to="/register">
                            <button className="button1" type="button">Register</button>
                        </Link>
                        <Link to="/login">
                         <button className="button2" type="button">Login</button>
                         </Link>
                         <Link to="/products">
                         <button className="button2" type="button">Products</button>
                         </Link>
                         <Link to="/cart">
                         <button className="button2" type="button">Cart</button>
                         </Link>
                         <Link to="/sell">
                         <button className="button2" type="button">Sell</button>
                         </Link>
                     </>
                 )}
            </nav>
                <p>This is a test message</p>

              <section id="product-list">
                <h2>Featured Products</h2>
                <div className="products" id="products-container">
                    {products.map(product => (
                            <Link key={product.id} to={'/product/${product.id}'} className="product">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                    </Link>
                    ))}
                    </div>
                </section>
        </div>
    );
};

export default Home;