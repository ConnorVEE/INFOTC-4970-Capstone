import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Automatically check if the user is authenticated on load (by checking cookies)
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Make a request to check if the user is authenticated
                const response = await axiosInstance.get('/users/check-authentication/', { withCredentials: true });
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    console.log("User is not authenticated. Proceed with login.");
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.log("User is not authenticated. Proceed with login.");
            }
        };
        checkAuthStatus();
    }, []);
    
    // Login function using the login service
    const login = async (username, password) => {
        try {
            const data = await loginService(username, password);
            setUser({ username: data.username, email: data.email });
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    // Logout function using the logout service
    const logout = () => {
        logoutService();  // Clears cookies
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
