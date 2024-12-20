import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

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

    const categories = [
        'All',
        'Electronics',
        'Clothing',
        'Furniture',
        'Sports',
        'Books',
    ];

    const [activeCategory, setActiveCategory] = useState('All');
    
    const filteredListings = activeCategory === 'All'
        ? products
        : products.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase());

    // Handle favoriting and unfavoriting 
    
    // Debouncing function used to stop rapid user API calls
    function debounce(func, wait) {
        let timeout;

        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };

    }
    
    const debouncedFavoriteToggle = debounce(async (event, listingId) => {
        event.preventDefault(); // Prevent link navigation
        
        try {
            const product = products.find((p) => p.id === listingId);
            const method = product.is_favorited ? 'DELETE' : 'POST';

            // Toggle favorite via API
            await axiosInstance({
                url: `/listings/${listingId}/favorite/`,
                method: method,
            });

            // Update local state to reflect the new favorite status
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.id === listingId
                        ? { ...p, is_favorited: !p.is_favorited }
                        : p
                )
            );

        } catch (error) {
            console.error('Error toggling favorite:', error);
        }

    }, 300); 

    // Usage
    const handleFavoriteToggle = (event, listingId) => {
        debouncedFavoriteToggle(event, listingId);
    };

    
    return (
        <div className="home-container">
            <Navbar /> {/* Include the Navbar here */}

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

            <div>
                <button className="button3" type="submit" onClick={logout}>Log out</button>
            </div>

            <button>
                <Link to="/create-listing" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Create Listing!
                </Link>
            </button>

            <button>
                <Link to="/create-message" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Send a Message!
                </Link>
            </button>

            {/* Grid for Listings */}

            <div className="grid-container">

                {filteredListings.map((product) => (

                    <div key={product.id} className="listing-card">

                        <Link
                            to={`/listing/${product.id}`}
                            className="listing-link"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? product.images[0].image
                                        : 'default-image.jpg'
                                }
                                alt={product.title}
                            />
                            <h3>{product.title}</h3>
                            <p>{product.price}</p>
                        </Link>

                        <button
                            className={`favorite-button ${
                                product.is_favorited ? 'favorited' : ''
                            }`}
                            onClick={(e) => handleFavoriteToggle(e, product.id)}
                        >
                            {product.is_favorited ? '★ Favorited' : '☆ Favorite'}
                        </button>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
