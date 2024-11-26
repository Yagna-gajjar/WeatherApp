import React from 'react';
import DisplayWeather from './DisplayWeather';
import Profile from './Profile';

export default function Display() {
    return (    
        <div className='flex'>
            <Profile />
            <DisplayWeather />
        </div>
    );
}
