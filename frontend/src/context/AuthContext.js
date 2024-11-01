import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 



// Solve this issue with a missing hook in the dependencies



    useEffect(() => {
        const checkAuthStatus = async () => {
            // console.log("Starting authentication check...");

            try {
                const response = await axiosInstance.get('users/check-authentication/', { withCredentials: true });

                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                    // console.log("User is authenticated");

                } else {
                    setIsAuthenticated(false);
                    // console.log("User is not authenticated.");

                }
            } catch (error) {
                setIsAuthenticated(false);
                // console.log("Error checking authentication status:", error);

            } finally {
                setLoading(false);  // Ensure this runs after try/catch
                // console.log("Loading is set to false", loading); // Track loading status
            }
        };
    
        checkAuthStatus();
    }, []);

    // Use for debugging

    // useEffect(() => {
    //     console.log("Auth status changed:", { isAuthenticated, loading });
    // }, [isAuthenticated, loading]);
    
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
