// src/components/AccountPage.js
import React, { useState, useEffect } from 'react';
import './AccountPage.css';

const AccountPage = () => {
    const [userData, setUserData] = useState({
        profilePicture: '',
        bio: '',
        degree: '',
        year: '',
        wishlist: [],
        listings: [],
    });

    useEffect(() => {
        // Simulate fetching user data from an API
        const fetchData = async () => {
            const mockData = {
                profilePicture: 'https://via.placeholder.com/150',
                bio: 'BIO goes here',
                degree: 'Bachelor of Science in Computer Science',
                year: 'Senior, 2024',
                wishlist: ['Laptop', 'Headphones', 'Desk', 'HARD CODED IN FOR NOW'],
                listings: ['2001 Topics in info textbook', 'Gym Shark Shorts', 'Mizzou Tickets'],
            };
            setUserData(mockData);
        };
        fetchData();
    }, []);

    return (
        <div className="account-container">
            <div className="account-header">
                <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="profile-picture"
                />
                <div className="account-info">
                    <h1>My Account</h1>
                    <p className="bio">{userData.bio}</p>
                    <p className="degree-year">
                        {userData.degree} - {userData.year}
                    </p>
                </div>
            </div>

            <div className="account-sections">
                <div className="wishlist-section">
                    <h2>Wishlist</h2>
                    <ul>
                        {userData.wishlist.length > 0 ? (
                            userData.wishlist.map((item, index) => (
                                <li key={index} className="wishlist-item">
                                    {item}
                                </li>
                            ))
                        ) : (
                            <p>No items in your wishlist.</p>
                        )}
                    </ul>
                </div>

                <div className="listings-section">
                    <h2>My Listings</h2>
                    <ul>
                        {userData.listings.length > 0 ? (
                            userData.listings.map((item, index) => (
                                <li key={index} className="listing-item">
                                    {item}
                                </li>
                            ))
                        ) : (
                            <p>No active listings.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;

