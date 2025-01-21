import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PvtRoute() {
    const api = useSelector((state) => state.api.url);
    const mode = useSelector((state) => state.mode.value);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        document.body.classList = mode;
    }, [mode]);

    useEffect(() => {
        const verifyUser = async () => {
            if (!token || !email) {
                navigate('/Signin');
                return;
            }
            try {
                const response = await axios.post(`${api}/api/verifyUser`, {
                    token,
                    email,
                });
                console.log(response.data.success);

                if (response.data.success) {
                    setIsAuthorized(true);
                } else {
                    navigate('/Signin');
                }
            } catch (error) {
                console.error('Verification failed:', error);
                navigate('/Signin');
            }
        };

        verifyUser();
    }, [token, email, navigate]);

    return isAuthorized ? <Outlet /> : null;
}
