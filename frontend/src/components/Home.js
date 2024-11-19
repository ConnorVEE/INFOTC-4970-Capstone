import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import './Home.css';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

const Home = () => {
    const { logout } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch listings from the backend
        const fetchListings = async () => {
            try {
                const response = await axiosInstance.get('/listings/all/');
    
                const fetchedListings = response.data.map(listing => ({
                    ...listing,
                    images: listing.images.map(image => ({
                        ...image,
                        image: `http://localhost:8000${image.image}`  // Prepend full URL to image path
                    }))
                }));
    
                setProducts(fetchedListings);
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };
    
        fetchListings();
    }, []);
    
    return (
        <div className="home-container">
            <Navbar /> {/* Include the Navbar here */}

            <div>
                <button className="button3" type="submit" onClick={logout}>Log out</button>
            </div>

            {/* Grid for Listings */}
            <div className="grid-container">

                {products.map(product => (
                    <div key={product.id} className="listing-card">
                        <img 
                            src={product.images && product.images.length > 0 
                                ? product.images[0].image 
                                : 'default-image.jpg'} 
                            alt={product.title} 
                        />
                        <h3>{product.title}</h3>
                        <p>{'$' + product.price}</p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Home;
