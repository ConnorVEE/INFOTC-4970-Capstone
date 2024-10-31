import React from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    /*
    // Create the HTML structure
    const html = document.documentElement;
    const body = document.createElement('body');
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    const paragraph = document.createElement('p');

    // Set text content
    heading.textContent = 'Welcome to Our Marketplace';
    paragraph.textContent = 'Discover amazing products!';

    // Style the container
    container.style.textAlign = 'center';
    container.style.color = 'white'; // Text color for contrast
    container.style.padding = '20px';

    // Append elements to the container
    container.appendChild(heading);
    container.appendChild(paragraph);

    // Append the container to the body
    body.appendChild(container);
    html.appendChild(body);

    // Apply CSS styles
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.height = '100vh'; // Full height

    // Set up background image
    body.style.backgroundImage = "url('background.png')"; // Link to the PNG file
    body.style.backgroundSize = 'cover'; // Cover the entire viewport
    body.style.backgroundPosition = 'center'; // Center the image
    body.style.backgroundRepeat = 'no-repeat'; // Prevent image repetition

    // Optional: Add some CSS for better visibility
    const style = document.createElement('style');
    style.textContent = `
        body {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;
    document.head.appendChild(style);
    */

    return (
        <div className='home-container'>
            {/* Main content */}
            <div className='container'>
                <h1>Mizzou Marketplace</h1>
                <p>*Insert cool slogan here*</p>
            </div>

            {/* Navigation buttons */}
            <div className='nav-container'>
                <button
                    className='login-button'
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>

                <button
                    className='register-button'
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>

                <button
                    className='conversations-button'
                    onClick={() => navigate('/conversations')}
                >
                    Direct Messages
                </button>

                {/* Add other future buttons with same format */}
            </div>
        </div>
    );
};

export default Home;