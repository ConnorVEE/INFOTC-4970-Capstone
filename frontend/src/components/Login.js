import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; 
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use the axiosInstance to make the POST request
            const response = await axiosInstance.post('/login', {
                username,
                password,
            });
            console.log('Login successful:', response.data); // Access token is sent back as a response
    
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || 'Login failed');
            } else {
                setErrorMessage('No response from server. Please try again later.');
            }
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Login;

