import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TodaysForecast from './components/TodaysForecast';
import CurrentWeather from './components/CurrentWeather';
import SevendayForecast from './components/SevendayForecast';
import ModeToggle from './components/ModeToggle';
import { Link } from 'react-router-dom';

export default function WeatherPage() {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className=''>
            {screenSize.width > 1024 ? (
                <div className='flex'>
                    <div className=''>
                        <div className='p-8'>
                            <CurrentWeather home="true" />
                        </div>
                        <TodaysForecast backgroundcolor="primary" cityId='674e0418a6b239ebfb81958b' />
                    </div>
                    <SevendayForecast backgroundcolor="primary" width='w-1/4'  cityId='674e0418a6b239ebfb81958b' />
                </div>) : (
                screenSize.width > 500 ? (
                    <div>
                        <div className='my-7 mx-10'>
                            <CurrentWeather home="true" />
                        </div>
                        <div className='my-5'>
                            <TodaysForecast backgroundcolor="primary" cityId='674e0418a6b239ebfb81958b' />
                        </div>
                        <div className='my-5'>
                            <SevendayForecast backgroundcolor="primary"  cityId='674e0418a6b239ebfb81958b'/>
                        </div>
                    </div>) : (

                    <div>
                        <div className='my-7 mx-3'>
                            <CurrentWeather home="true" />
                        </div>
                        <div className='mt-14'>
                            <TodaysForecast cityId='674e0418a6b239ebfb81958b' />
                        </div>

                    </div>))}
        </div>
    );
}

