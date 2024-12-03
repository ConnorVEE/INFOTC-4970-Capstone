import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import './Register.css';

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

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@umsystem\.edu$/;
      return regex.test(email);
  };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!validateEmail(email)) {
          setErrorMessage('Please enter a valid email address ending with @umsystem.edu');
          setLoading(false);
          return;
        }

        try {
            setLoading(true);
            setErrorMessage('');
        
            // Replace fetch with axiosInstance
            const response = await axiosInstance.post('/users/register/', {
                username,
                email,
                password
            });
        
            // Handle successful registration
            if (response.status === 201) { 
                await login(username, password);
                setLoading(false);
                navigate('/home');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }

        } catch (error) {
            if (error.response) {
                // The server responded with a status other than 2xx
                const data = error.response.data;
                setErrorMessage(data.error || 'Registration failed. Please try again.');

            } else if (error.request) {
                // The request was made but no response received
                setErrorMessage('Network error. Please try again.');

            } else {
                // Something else happened while setting up the request
                setErrorMessage('An unexpected error occurred. Please try again.');

            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register for Mizzou Marketplace</h2>
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
                    <label>Email: </label>
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <p>Already have an account? <Link to="/login">Login here!</Link></p>
        </div>
    );
};

export default Register;