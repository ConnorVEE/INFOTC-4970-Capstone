import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import AuthContext
import './Login.css';
import MizzouMarketplaceLogo from '../components/MMLogo.png'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);  
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');  // Clear error message when user types
        if (name === 'username') {
            setUsername(value);

        } else if (name === 'password') {
            setPassword(value);

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            setLoading(true);
            await login(username, password); // Attempt login
            setLoading(false);
            navigate('/home');  // Navigate only if login is successful
        } catch (error) {
            setLoading(false);
            console.log("Error response:", error.message); // Log the error message
            setErrorMessage(error.message); // Display the error message to the user
        }
        
    };

    return (
        <div className="login-container">
            <nav><Link to="/home">HOME!</Link></nav>
            <img src={MizzouMarketplaceLogo} alt="Mizzou Marketplace Logo" className="logo" />
            <h2>Login to Mizzou Marketplace</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
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
                    <label>Password: </label>
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
            <p>Don't have an account? <Link to="/register">Register here!</Link></p>
        </div>
    );
};

export default Login;
