import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PvtRoute({ children }) {
    const nav = useNavigate();
    const email = localStorage.getItem('email')
    useEffect(() => {
        if (!email) {
            nav('/signin')
        }
    }, [email, nav])
    return email ? children : nav('/signin');
}      
