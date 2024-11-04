import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

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
            <Navbar /> {/* Include the Navbar here */}
            <div>
            {/*<button className="button1" type="submit">Register</button>*/}
            {/*<button className="button2" type="submit">Login</button>*/}
            <button className="button3" type="submit" onClick={logout}>Log out</button>
            </div>
        </div>
    );
};

export default Home;