import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // Render a loading message while authentication status is being determined
    if (loading) {
        return <div>Loading...</div>;
    }

    // Navigate to login if user is not authenticated
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
