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
            {/* <div className='flex'>
                <div className='pe-2'>
                    <SideBar />
                </div>
                <Link to={'/cityList'} className='w-8/12 bg-primary rounded-xl p-2 border-none outline-none text-secondary'>Search for cities</Link>
                <ModeToggle />
            </div> */}
            {screenSize.width > 1024 ? (
                <div className='flex'>
                    <div className=''>
                        <div className='p-8'>
                            <CurrentWeather home="true" />
                        </div>
                        <TodaysForecast backgroundcolor="primary" />
                    </div>
                    <SevendayForecast backgroundcolor="primary" width='w-1/4' />
                </div>) : (
                screenSize.width > 500 ? (
                    <div>
                        <div className='my-7 mx-10'>
                            <CurrentWeather home="true" />
                        </div>
                        <div className='my-5'>
                            <TodaysForecast backgroundcolor="primary" />
                        </div>
                        <div className='my-5'>
                            <SevendayForecast backgroundcolor="primary" />
                        </div>
                    </div>) : (

                    <div>
                        <div className='my-7 mx-3'>
                            <CurrentWeather home="true" />
                        </div>
                        <div className='mt-14'>
                            <TodaysForecast />
                        </div>

                    </div>))}
        </div>
    );
}
