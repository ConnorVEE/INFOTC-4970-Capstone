import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        let isMounted = true;  // Track if component is mounted

        const checkAuthentication = async () => {

            try {
                const response = await axiosInstance.get('/users/check-authentication/');

                if (response.data.isAuthenticated && isMounted) {
                    setIsAuthenticated(true);
                    setUser(response.data.user); 

                } else {
                    setIsAuthenticated(false);

                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);

            } finally {
                if (isMounted) setLoading(false);

            }
        };
    
        checkAuthentication();  // Run on initial load
    
        return () => { isMounted = false };  // Cleanup on unmount
    }, []); 

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
        setIsAuthenticated(false);
        setUser(null);
        logoutService();
    };

    if (loading) return <div>Loading...</div>;

    // I cut out 'loading' because it breaks the application
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
