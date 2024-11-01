import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // Debugging logs 
    
    // console.log("ProtectedRoute - Authenticated:", isAuthenticated, "Loading:", loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};


export default ProtectedRoute;


