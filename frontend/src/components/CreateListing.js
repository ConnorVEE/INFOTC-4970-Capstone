import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './styles/CreateListing.css';

const CreateListing = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axiosInstance.post('create/', {
                title,
                description,
                price,
                category,
            });

            // On success, navigate to the image upload page with listing ID
            const listingId = response.data.listing.id;
            navigate(`/add-images/${listingId}`);
        } catch (error) {
            console.error('Error creating listing:', error);
            setErrorMessage('Failed to create listing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-listing-container">
            <Navbar />
            <h2>Create a New Listing</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Price($):</label>
                    <input
                        min="0"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category: </label>
                    <select
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required>
                        <option value="" disabled>Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Sports">Sports</option>
                        <option value="Books">Books</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Listing'}
                </button>
            </form>
            <form action="/home" method="get">
                <button type="submit">Go to Home</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default CreateListing;
