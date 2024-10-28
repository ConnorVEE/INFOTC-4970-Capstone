import React, { createContext, useState, useEffect } from 'react';
import { refreshToken } from '../api/axiosInstance';
import { login as loginService, logout as logoutService } from '../services/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Automatically check if the user is authenticated on load (by checking cookies)
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Try refreshing the token to see if the user is logged in
                await refreshToken();
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
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
