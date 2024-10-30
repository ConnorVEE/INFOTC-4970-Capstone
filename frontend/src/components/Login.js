import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import AuthContext
import './Login.css';


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
            // Use login function from AuthContext
            await login(username, password);
            setLoading(false);
            navigate('/home');  

        } catch (error) {
            setLoading(false);

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
                setErrorMessage('No response from server. Please check your connection.');
                
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <body>
        <div className="login-container">
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
        </body>
    );
};

export default Login;
