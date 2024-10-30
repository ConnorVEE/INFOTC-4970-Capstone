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
                const response = await axiosInstance.get('/users/check-authentication/', { withCredentials: true });
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    console.log("User is not authenticated.");
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.log("Error checking authentication status:", error);
            }
        };
    
        // Only run authentication check if status is initially unknown
        if (isAuthenticated === null) {  
            checkAuthStatus();
        }
    }, [isAuthenticated]);
    
    // Show a loading spinner or message until authentication status is known
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    
    const login = async (username, password) => {
        try {
            const data = await loginService(username, password);
    
            // Check if data exists and contains username and email
            if (data?.username && data?.email) {
                setUser({ username: data.username, email: data.email });
                setIsAuthenticated(true);
            } else {
                console.log("Data received is not valid:", data); // Log the received data
                throw new Error("Invalid response data");  // Handle unexpected response format
            }
        } catch (error) {
            console.error("Caught error in AuthContext:", error); // Log the entire error for context
            throw new Error(error)
    
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
