import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isJwtExpired } from '../../functions/auth/jwtRelated.js';
import { BASE_SERVER_URL } from '../../utils/env';
import ReToken from '../../functions/auth/refreshToken';
import './director.scss';
import Loading from '../../components/loading/loading.compoment';

const Director = () => {
    const navigate = useNavigate();

    useEffect(() => {

        // delay function for testing purposes
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const checkAuth = async () => {
            const acToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            //await delay(25000)
            if ((acToken || refreshToken) && refreshToken) {
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
                        } else {
                            const refreshed = await ReToken();
                            if (refreshed) {
                                navigate('/dashboard');
                            } else {
                                navigate('/login');
                            }

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

        checkAuth().then(r => {});
    }, [navigate]);

    // put loading screen here later to show loading state
    return (
        <div className="director-container">
            <div className="director-loading">
                <Loading />
                Checking authentication...
            </div>
        </div>
    );
};

export default Director;
