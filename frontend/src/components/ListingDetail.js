import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import axiosInstance from '../api/axiosInstance';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/ListingDetail.css';

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);

    useEffect(() => {

        const fetchListing = async () => {

            try {
                const response = await axiosInstance.get(`/listings/${id}/`);
                console.log('Fetched listing:', response.data); // Debug response data
                setListing(response.data);

            } catch (error) {
                console.error("Error fetching listing:", error);

            }
        };
    
        fetchListing();
    }, [id]);

    if (!listing) return <p>Loading...</p>;

    return (
        
        <div className="listing-detail">
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <h1>{listing.title}</h1>

            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                loop={true}
                modules={[Navigation, Pagination]}
                className="image-swiper"
            >
                {listing.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`http://localhost:8000${image.image}`}
                            alt={`Listing ${index + 1}`}
                            className="swiper-image"
                        />
                    </SwiperSlide>
                ))}

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </Swiper>

            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>

            <button className="message-seller">Message Seller</button>
        </div>
    );
};

export default ListingDetail;
