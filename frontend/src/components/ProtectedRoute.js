import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    console.log("Authenticated:", isAuthenticated); // Debugging line

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};


export default ProtectedRoute;

