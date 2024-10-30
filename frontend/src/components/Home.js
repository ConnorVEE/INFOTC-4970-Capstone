import React from 'react';
import './Home.css';


const Home = () => {

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

    return (
        <div className="home-container">
            <body>
                <div class="container">
                    <h1>Mizzou Marketplace</h1>
                </div>
            </body>
            <div>
            <button className="button1" type="submit">Register</button>
            <button className="button2" type="submit">Login</button>
            </div>
        </div>
    );
};

export default Home;