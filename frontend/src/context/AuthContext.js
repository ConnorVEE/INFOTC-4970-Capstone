import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkAuthentication = async () => {
            // Immediately exit if user is not authenticated
            if (!isAuthenticated) return;
    
            try {
                // Call the endpoint to check authentication
                const response = await axiosInstance.get('/users/check-authentication/');
                
                // Update authentication state based on response
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser(response.data.user);  // Assume the response includes user data
                    console.log("User is already authenticated. Granting access");
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
    
        // Invoke the authentication check
        checkAuthentication();
    }, [isAuthenticated]);  // Add isAuthenticated as a dependency

    useEffect(() => {
        console.log("isAuthenticated changed:", isAuthenticated);
    }, [isAuthenticated]);

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

    const logout = () => {
        console.log("User has been logged out");
        // document.cookie = "access_token=; Max-Age=-99999999; path=/;";  // Clear access token
        // document.cookie = "refresh_token=; Max-Age=-99999999; path=/;";  // Clear refresh token
        // setIsAuthenticated(false);  // Ensure state is updated immediately
        // setUser(null);              // Clear user data
        // window.location.href = '/login';
        setIsAuthenticated(false);
        setUser(null);
        logoutService();
    };

    // I cut out 'loading' because it breaks the application
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
