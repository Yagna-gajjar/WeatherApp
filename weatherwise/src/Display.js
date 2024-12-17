import React, { useEffect, useState } from 'react';
import DisplayWeather from './DisplayWeather.js';
import Profile from './Profile';

export default function Display() {

    return (
        <div className='flex'>
            <Profile />
            <DisplayWeather />
        </div>
    );
}
