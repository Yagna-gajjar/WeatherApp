import React, { useEffect, useState } from 'react';
import DisplayWeather from './DisplayWeather.js';
import Profile from './Profile';
import Loader from './Loader.js'

export default function Display() {
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);


    return (
        loading ? (<Loader />) : (<div className='flex'>
            <Profile />
            <DisplayWeather />
        </div>)
    );
}
