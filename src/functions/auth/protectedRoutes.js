import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BASE_SERVER_URL } from '../../utils/env';

const ProtectedRoute = ({ children, requiredAuth, redirectTo = '/login' }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    const accessToken = localStorage.getItem('accessToken');
    const hasAuthLink = localStorage.getItem('authLink') !== null;

    useEffect(() => {
        const checkAuth = async (acToken) => {
            const result = await fetch(`${BASE_SERVER_URL}/api/v1/verifyToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acToken}`,
                },
            });

            return result.ok;
        };

        const verifyAuth = async () => {
            if (requiredAuth === 'jwt' && accessToken !== null) {
                setIsAuthenticated(true);
            } else if (requiredAuth === 'authLink' && hasAuthLink) {
                setIsAuthenticated(true);
            } else if (requiredAuth === 'serverVerify' && accessToken !== null) {
                const isValid = await checkAuth(accessToken);
                setIsAuthenticated(isValid);
            }
            setAuthChecked(true);
        };

        verifyAuth();
    }, [accessToken, hasAuthLink, requiredAuth]);

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default ProtectedRoute;
