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

//Add some CSS for better visibility
const style = document.createElement('style');
style.textContent = `
    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const products = [
    { id: 1, name: 'Product 1', price: "$10", image: "n/a" },
    { id: 2, name: 'Product 2', price: "$20", image: "n/a" },
    { id: 3, name: 'Product 3', price: "$30", image: "n/a" },
];

const productsContainer = document.getElementById("products-container");

function displayProducts() {
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;
        productsContainer.appendChild(productDiv);
    });
}

window.onload = displayProducts;
document.head.appendChild(style);

    return (
        <div className="home-container">
            
            {/* Body tags cannot be a child of a div, sends errors to the console, sorry */}

            <div className="container">
                <h1>Mizzou Marketplace</h1>
            </div>
            
            <div>
            <button className="button1" type="submit">Register</button>
            <button className="button2" type="submit">Login</button>
            {/* <button className="button3" type="submit" onClick={logout}>Log out</button> */}
            </div>

            <section id="product-list">
            <h2>Featured Products</h2>
            <div class="products" id="products-container"></div>
        </section>
        </div>
    );
};

export default Home;