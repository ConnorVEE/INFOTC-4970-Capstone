import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const ListingDetail = () => {
    const { id } = useParams(); // Extract the listing ID from the URL
    const [listing, setListing] = useState(null);

    useEffect(() => {
        // Fetch the specific listing by its ID
        const fetchListing = async () => {
            try {
                const response = await axiosInstance.get(`/listings/${id}/`);
                setListing(response.data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            }
        };

        fetchListing();
    }, [id]);

    if (!listing) return <p>Loading...</p>; // Show a loading message while fetching

    return (
        <div className="listing-detail">
            <h1>{listing.title}</h1>
            <img 
                src={listing.images.length > 0 ? `http://localhost:8000${listing.images[0].image}` : 'default-image.jpg'} 
                alt={listing.title} 
            />
            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default ListingDetail;
