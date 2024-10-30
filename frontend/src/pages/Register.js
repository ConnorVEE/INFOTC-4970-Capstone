import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);  // Import the login function
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');
        if (name === 'username') setUsername(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                // Auto-login user after successful registration
                await login(username, password);
                navigate('/home');  // Redirect to home page

            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register for Mizzou Marketplace</h2>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <p>Already have an account? <Link to="/login">Login here!</Link></p>
        </div>
    );
};

export default Register;