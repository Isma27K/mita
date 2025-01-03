import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isJwtExpired } from '../../functions/auth/jwtRelated.js';
import { BASE_SERVER_URL } from '../../utils/env';

const Director = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const acToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (acToken && refreshToken) {
                if (!isJwtExpired(refreshToken)) {
                    try {
                        const result = await fetch(`${BASE_SERVER_URL}/api/v1/verifyToken`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${acToken}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (result.ok) {
                            // Go to dashboard
                            navigate('/dashboard');
                        } else if (result.status === 403) {
                            navigate('/login');
                        } else {
                            navigate('/login');
                        }
                    } catch (error) {
                        console.error('Error verifying token:', error);
                        navigate('/login');
                    }
                } else {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkAuth().then(r => {
            console.log("ok");
        });
    }, [navigate]);

    // put loading screen here later to show loading state
    return (
        <div>
            Checking authentication...
        </div>
    );
};

export default Director;
