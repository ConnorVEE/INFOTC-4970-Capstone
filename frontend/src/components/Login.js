import React, { useState } from 'react';
import { login } from '../services/auth';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // handle input changes and clear error message when user types again
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setErrorMessage('');

        // Update the state based on which input is changing
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // handle logging in
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            // Call the login function
            const response = await login(username, password); 
            console.log('Login successful:', response);
            setLoading(false);

        } catch (error) {

            setLoading(false); 

            // handling of specific errors
            if (error.response) {
                const status = error.response.status;
                
                if (status === 401) {
                    setErrorMessage('Invalid username or password. Please try again.');

                } else if (status === 400) {
                    setErrorMessage('Validation issue. Please check your credentials.');

                } else if (status === 500) {
                    setErrorMessage('Server error. Please try again later.');

                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.');

                }

            } else if (error.request) {
                // No response from server
                setErrorMessage('No response from server. Please check your connection.');
            } else {
                // Any other error during request setup
                setErrorMessage('Error: ' + error.message);
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
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        required
                        disabled={loading} 
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                        disabled={loading} 
                    />
                </div>

                <button type="submit" disabled={loading}> 
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {errorMessage && <div className="error-message">{errorMessage}</div>} 
        </div>
    );

};

export default Login;

