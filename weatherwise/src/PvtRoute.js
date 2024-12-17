import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PvtRoute({ children }) {
    const nav = useNavigate();
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            nav('/signin')
        }
    }, [token, nav])
    return token ? children : nav('/signin');
}      
