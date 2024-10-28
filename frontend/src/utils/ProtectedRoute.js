import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  

// changed syntax to modern React Router syntax
const ProtectedRoute = ({ children }) => {
    // Get authentication state
    const { isAuthenticated } = useContext(AuthContext);

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;

