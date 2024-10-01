
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });
            console.log(response.data); // Handle successful login here

        } catch (error) {
            if (error.response) {
                // This means the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrorMessage(error.response.data); // Set error message to state
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an error
                setErrorMessage('Error: ' + error.message);
            }
            console.error('Login failed:', errorMessage); // Log the error
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error messages */}
        </div>
    );
};

export default Login;

