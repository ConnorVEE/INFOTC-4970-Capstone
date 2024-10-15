import React, { useState } from 'react';
import { login } from '../services/auth';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading} 
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

