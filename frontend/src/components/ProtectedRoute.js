import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  

const ProtectedRoute = ({ element: Component, ...rest }) => {
    // Get authentication state from context
    const { isAuthenticated } = useContext(AuthContext);  

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        // If not authenticated, redirect to the login page
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;

