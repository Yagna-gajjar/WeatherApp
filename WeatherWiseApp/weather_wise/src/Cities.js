import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import TodaysForecast from './components/TodaysForecast';
import SevendayForecast from './components/SevendayForecast';
import Citydisplay from './components/Citydisplay';
import axios from 'axios';
import { useSelector } from "react-redux";
import ModeToggle from './components/ModeToggle';
import SideBar from './components/SideBar';
import PerticularCity from './components/PerticularCity';

export default function Cities() {
    const [cities, setCities] = useState([]);
    const api = useSelector((state) => state.api.url);
    const cityId = useSelector((state) => state.searchedCity.cityId)
    const [currentWeather, setCurrentWeather] = useState({
        cityName: "",
        temp: "",
        wind_speed: "",
        humidity: "",
        status: "",
        status_image: ""
    });
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [relatedCities, setRelatedCities] = useState([]);

    useEffect(() => {
        fetchCites();
        fetchCities();
    }, [currentHour]);

    const fetchCites = async () => {
        const response = await axios.get(`${api}/api/Weatherstatewise/${cityId}/2024-12-22`)
        setRelatedCities(response.data.weather);
    }

    const fetchCities = async () => {
        const response = await axios.get(`${api}/api/Weatherdatewise/2024-12-22`);
        setCities(response.data.weather);
    };

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
        screenSize.width > 500 ? (
            <div>
                <div className='flex'>
                    <div className='w-2/3 h-screen overflow-y-scroll'>
                        <Citydisplay List={relatedCities} />
                    </div>
                    <div className='w-1/3 h-screen overflow-y-scroll'>
                        <PerticularCity />
                        <TodaysForecast />
                        <SevendayForecast />
                    </div>
                </div>
            </div>) : (
            <div>
                <div className='flex overflow-hidden'>
                    <div className='w-full '>
                        <Citydisplay List={relatedCities} />
                        <TodaysForecast />
                        <SevendayForecast />
                    </div>
                </div>
            </div>
        )
    );
}
