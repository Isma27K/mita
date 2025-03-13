import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_SERVER_URL } from '../../utils/env';
import { isJwtExpired } from './jwtRelated';
import ReToken from './refreshToken';
//import loading from '../../assets/loading.gif';
import Loading from '../../components/loading/loading.compoment';

const ProtectedRoute = ({ children, requiredAuth, redirectTo = '/login' }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const hasAuthLink = localStorage.getItem('authLink') !== null;

    useEffect(() => {
        const checkAuth = async (acToken) => {
            try {
                const result = await fetch(`${BASE_SERVER_URL}/api/v1/verifyToken`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${acToken}`,
                    },
                });
                return result.ok;
            } catch (error) {
                console.error('Error verifying token:', error);
                return false;
            }
        };

        const verifyAuth = async () => {
            if (!refreshToken) {
                navigate(redirectTo);
                return;
            }

            if (requiredAuth === 'jwt' && accessToken !== null) {
                setIsAuthenticated(true);
            }
            else if (requiredAuth === 'authLink' && hasAuthLink) {
                setIsAuthenticated(true);
            }
            else if (requiredAuth === 'serverVerify' && accessToken !== null) {  // mainly use due to jwt verification

                // check if we have refresh token but not access token (the logic is that we can still req for new acc token)
                if (!accessToken && refreshToken) {
                    const refreshedOne = await ReToken();
                    if (refreshedOne) {
                        const retryIsValid = await checkAuth(localStorage.getItem('accessToken'));
                        setIsAuthenticated(retryIsValid);
                    } else {
                        navigate(redirectTo);
                    }
                }
                else if (!refreshToken) {
                    navigate(redirectTo);
                }
                else{
                    const isValid = await checkAuth(accessToken);

                    if (!isValid) {
                        if (!isJwtExpired(refreshToken)) {
                            const refreshed = await ReToken();
                            if (refreshed) {
                                const retryIsValid = await checkAuth(localStorage.getItem('accessToken'));
                                setIsAuthenticated(retryIsValid);
                            } else {
                                navigate(redirectTo);
                            }
                        } else {
                            navigate(redirectTo);
                        }
                    } else {
                        setIsAuthenticated(true);
                    }
                }

            }

            setAuthChecked(true);
        };

        verifyAuth().then(r => {});
    }, [accessToken, hasAuthLink, requiredAuth, refreshToken, navigate, redirectTo]);

    if (!authChecked) {
        return (
            <div>
                <Loading />
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default ProtectedRoute;
