import React from 'react';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar /> {/* Include the Navbar here */}
            <div>
                <h1>Welcome to the Home Page!</h1>
            </div>
        </div>
    );
};

export default Home;