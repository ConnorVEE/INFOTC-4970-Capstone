import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar'

const Sell = ({ addProduct }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('')
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0])); // Preview the image
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a product object
        const product = {
            id: Date.now(), // Unique ID for the product
            title,
            description,
            image,
            price,
            category, // You may want to add a price field as well
        };

        // Call the addProduct function passed as a prop
        addProduct(product);

        // Redirect to the products page after submission
        navigate('/products');
    };

    return (
        <div className="sell-container">
            <Navbar />
            <h2>Sell Your Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <label>Product Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form">
                    <label>Price:</label>
                    <input
                        type="number" // Set type to number for price input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0" // Optional: prevent negative prices
                        step="0.01" // Optional: allows decimal prices
                    />
                </div>
                <div className="form">
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Sports">Sports</option>
                        <option value="Books">Books</option>
                    </select>
                </div>
                <div className="form">
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {image && <img src={image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
                </div>
                <button type="submit">Submit Product</button>
            </form>
        </div>
    );
};

export default Sell;

