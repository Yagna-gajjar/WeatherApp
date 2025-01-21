import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';


export default function PerticularCity() {
    const cityId = useSelector((state) => state.searchedCity.cityId);
    const api = useSelector((state) => state.api.url);
    const [currentWeather, setCurrentWeather] = useState({
        cityName: "",
        temp: "",
        wind_speed: "",
        humidity: "",
        status: "",
        status_image: ""
    });
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    useEffect(() => {
        fetchData()
        console.log(cityId);

    }, [cityId]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${api}/api/Weathercitydatewise/${cityId}/2024-12-19`
            );

            const hourData = response.data.weather.hourly.find(e => e.time === `${currentHour.toString().padStart(2, '0')}:00`);

            if (hourData) {
                setCurrentWeather({
                    cityName: response.data.weather.cityID.cityName,
                    temp: hourData.temperature,
                    wind_speed: hourData.windSpeed,
                    humidity: hourData.humidity,
                    status: hourData.status,
                    status_image: hourData.status_image + '.png'
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div>
            <div className='p-5'>
                <div className='flex flex-col w-full h-52 min-[500px]:h-64 font-rubik'>
                    <div className="text-text w-full flex justify-between">
                        <div>
                            <p className='text-xl min-[1130px]:text-2xl font-bold'>{currentWeather.cityName}</p>
                            <p className={`text-secondary text-xs min-[1130px]:text-sm xl:text-base`}>Chance of rain: 0%</p>
                        </div>
                        <div className=''>
                            <div className='flex'>
                                <svg className="fill-secondary w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 256 512">
                                    <path d="M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V224c0-17.673 14.327-32 32-32s32 14.327 32 32v104.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"></path></svg>
                                <p className="text-secondary text-[10px] min-[1130px]:text-xs xl:text-sm">Temperature</p>
                            </div>
                            <p className="text-3xl min-[1130px]:text-4xl xl:text-5xl font-bold text-text">{currentWeather.temp}°</p>
                        </div>
                    </div>
                    <div className='flex  justify-center'>
                        {currentWeather.status_image != '' ? (<img className='w-48 h-48'
                            src={require(`../assests/weather_status_image/${currentWeather.status_image}`)}
                        />) : (
                            <CircularProgress />
                        )}
                    </div>
                </div >
            </div>
        </div>
    );
}
