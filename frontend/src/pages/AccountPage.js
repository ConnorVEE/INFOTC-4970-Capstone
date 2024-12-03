// src/components/AccountPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/AccountPage.css';

const AccountPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // Dynamically handle user data
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/users/get-user-profile/');
                // console.log('Fetched user data:', response.data);
                setUserData(response.data); // Directly set the entire API response

            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/home'); // Redirect to login if unauthorized
            }
        };

        fetchUserData();

    }, [navigate]);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    if (!userData) return <p>Loading...</p>;

    return (

        <div>
            <div className='account-container'>
                <button onClick={() => navigate(-1)} className="back-button">Back</button>

                <div className='account-header'>
                    <h1>User Profile</h1>
                    <img
                        src={userData.profilePicture}
                        alt="Profile"
                        className="profile-picture"
                    />

                    <div className='account-info'>
                        <p>Name: {userData.username}</p>
                        <p>Status: {userData.is_verified ? 'Verified' : 'Unverified'}</p>
                        <p>Bio: {userData.profile.bio ? '' : "User doesn't have a Bio"}</p>
                        <p>Rating: {userData.profile.rating}</p>
                    </div>
                </div>
                
            </div>

            <div className='account-sections'>
                
                <div className='listings-section'>
                    <h2>Listings</h2>
                    <ul>
                        {/* {userData.listings.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))} */}
                    </ul>
                </div>

            </div>

            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </div>
    );
};


// const AccountPage = () => {
//     const navigate = useNavigate();

//     const [userData, setUserData] = useState({
//         profilePicture: '',
//         bio: '',
//         degree: '',
//         year: '',
//         wishlist: [],
//         listings: [],
//     });

//     const [isEditing, setIsEditing] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             const mockData = {
//                 profilePicture: 'https://via.placeholder.com/150',
//                 bio: 'BIO goes here',
//                 degree: 'Bachelor of Science in Computer Science',
//                 year: 'Senior, 2024',
//                 wishlist: ['Laptop', 'Headphones', 'Desk', 'HARD CODED IN FOR NOW.'],
//                 listings: ['2001 Topics in info textbook', 'Gym Shark Shorts', 'Mizzou Tickets'],
//             };
//             setUserData(mockData);
//         };
//         fetchData();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleArrayChange = (e, field, index) => {
//         const value = e.target.value;
//         setUserData((prevData) => {
//             const updatedArray = [...prevData[field]];
//             updatedArray[index] = value;
//             return { ...prevData, [field]: updatedArray };
//         });
//     };

//     const handleProfilePictureChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setUserData((prevData) => ({
//                     ...prevData,
//                     profilePicture: reader.result,
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const toggleEdit = () => setIsEditing(!isEditing);

//     return (
//         <div className="account-container">
//             <div className="account-header">
//                 <button onClick={() => navigate(-1)} className="back-button">Back</button>

//                 <img
//                     src={userData.profilePicture}
//                     alt="Profile"
//                     className="profile-picture"
//                 />

//                 {isEditing && (
//                     <div className="profile-picture-upload">
//                         <label htmlFor="profilePicture">Change Profile Picture</label>
//                         <input
//                             type="file"
//                             id="profilePicture"
//                             accept="image/*"
//                             onChange={handleProfilePictureChange}
//                         />
//                     </div>
//                 )}

//                 <div className="account-info">
//                     <h1>My Account</h1>

//                     {isEditing ? (
//                         <textarea
//                             name="bio"
//                             value={userData.bio}
//                             onChange={handleInputChange}
//                             className="bio-edit"
//                         />
//                     ) : (
//                         <p className="bio">{userData.bio}</p>
//                     )}

//                     {isEditing ? (
//                         <>
//                             <input
//                                 name="degree"
//                                 value={userData.degree}
//                                 onChange={handleInputChange}
//                                 className="degree-edit"
//                             />
//                             <input
//                                 name="year"
//                                 value={userData.year}
//                                 onChange={handleInputChange}
//                                 className="year-edit"
//                             />
//                         </>
//                     ) : (
//                         <p className="degree-year">
//                             {userData.degree} - {userData.year}
//                         </p>
//                     )}

//                 </div>
//             </div>

//             <button onClick={toggleEdit} className="edit-button">
//                 {isEditing ? 'Save' : 'Edit'}
//             </button>

//             <div className="account-sections">
//                 <div className="wishlist-section">
//                     <h2>Wishlist</h2>
//                     <ul>
//                         {userData.wishlist.length > 0 ? (
//                             userData.wishlist.map((item, index) => (
//                                 <li key={index} className="wishlist-item">
//                                     {isEditing ? (
//                                         <input
//                                             value={item}
//                                             onChange={(e) => handleArrayChange(e, 'wishlist', index)}
//                                             className="array-edit"
//                                         />
//                                     ) : (
//                                         item
//                                     )}
//                                 </li>
//                             ))
//                         ) : (
//                             <p>No items in your wishlist.</p>
//                         )}
//                     </ul>
//                 </div>

//                 <div className="listings-section">
//                     <h2>My Listings</h2>
//                     <ul>
//                         {userData.listings.length > 0 ? (
//                             userData.listings.map((item, index) => (
//                                 <li key={index} className="listing-item">
//                                     {isEditing ? (
//                                         <input
//                                             value={item}
//                                             onChange={(e) => handleArrayChange(e, 'listings', index)}
//                                             className="array-edit"
//                                         />
//                                     ) : (
//                                         item
//                                     )}
//                                 </li>
//                             ))
//                         ) : (
//                             <p>No active listings.</p>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default AccountPage;
