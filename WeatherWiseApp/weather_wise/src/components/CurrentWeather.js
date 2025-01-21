import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function SkeletonLoadBig() {
    return (
        <div className='flex justify-between'>
            <Stack spacing={2}>
                <Skeleton sx={{ bgcolor: 'grey.700' }} variant="rounded" width={200} height={60} />
                <Skeleton sx={{ bgcolor: "grey.700" }} variant="rounded" width={180} height={30} />
                <Skeleton sx={{ bgcolor: "grey.700" }} variant="rounded" width={150} height={20} />
            </Stack>
            <Skeleton sx={{ bgcolor: "grey.800" }} variant='circular' width={100} height={100} />
        </div>
    );
}

function SkeletonLoadSmall() {
    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            <Skeleton sx={{ bgcolor: 'grey.700' }} variant='rounded' width={200} height={30} />
            <Skeleton sx={{ bgcolor: 'grey.700' }} variant='circular' width={70} height={70} />
            <Skeleton sx={{ bgcolor: 'grey.700' }} variant='rounded' width={180} height={20} />
            <Skeleton sx={{ bgcolor: 'grey.700' }} variant='rounded' width={130} height={10} />
        </div>
    )
}


export default function CurrentWeather(props) {
    const { home } = props;
    const [isLoading, setIsLoading] = useState(true);
    const mode = useSelector((state) => state.mode.value);
    const api = useSelector((state) => state.api.url);
    const [currentWeather, setCurrentWeather] = useState({
        cityName: "",
        temp: "",
        wind_speed: "",
        humidity: "",
        status: "",
        status_image: ""
    });
    const [timenow, setTimenow] = useState(new Date());

    useEffect(() => {
        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${api}/api/Weathercitydatewise/674e0418a6b239ebfb81958b/2024-12-19`
            );

            const hourData = response.data.weather.hourly.find(e => e.time === `${timenow.getHours().toString().padStart(2, '0')}:00`);

            if (hourData) {
                setCurrentWeather({
                    cityName: response.data.weather.cityID.cityName,
                    stateName: response.data.weather.cityID.stateID.stateName,
                    countryName: response.data.weather.cityID.countryID.countryName,
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
        setTimenow(new Date())

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [timenow]);

    return (
        screenSize.width >= 500 ? (
            isLoading ? (<SkeletonLoadBig />) : (
                <div className='flex justify-between w-full h-52 min-[500px]:h-64 font-rubik'>
                    <div className={`text-text flex flex-col justify-between`}>
                        <div className='flex'>
                            <div>
                                <p className='text-xl min-[1130px]:text-2xl font-bold'>{currentWeather.cityName}</p>
                                <p className={`text-secondary text-xs min-[1130px]:text-sm xl:text-base`}>{currentWeather.stateName}, {currentWeather.countryName}</p>
                            </div>
                            <p className='text-secondary mx-5 '><MyLocationIcon /><span>Track my city</span></p>
                        </div>
                        <div className='pt-11'>
                            <div className='flex'>
                                <svg className="fill-secondary w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 256 512">
                                    <path d="M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V224c0-17.673 14.327-32 32-32s32 14.327 32 32v104.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"></path></svg>
                                <p className="text-secondary text-[10px] min-[1130px]:text-xs xl:text-sm">Temperature</p>
                            </div>
                            <p className="text-3xl min-[1130px]:text-4xl xl:text-5xl font-bold text-text">{currentWeather.temp}°</p>
                        </div>
                        <div className='pt-11'>
                            <div className='flex'>
                                <svg className="fill-secondary w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 512 512">
                                    <path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z">
                                    </path>
                                </svg>
                                <p className="text-secondary text-[10px] min-[1130px]:text-xs xl:text-sm ps-2">Wind speed</p>
                            </div>
                            <p className="font-bold text-xs min-[1130px]:text-sm xl:text-base text-text">{currentWeather.wind_speed} km/h</p>
                        </div>
                    </div>
                    <div className='flex justify-center'>

                        {currentWeather.status_image != '' ? (<img
                            src={require(`../assests/weather_status_image/${currentWeather.status_image}`)}
                        />) : (
                            <></>
                        )}
                    </div>
                </div >)) : (
            isLoading ? (<SkeletonLoadSmall />) : (<div className=''>
                <div className='flex flex-col justify-center'>
                    <p className='flex justify-center text-text text-3xl'>{currentWeather.cityName}</p >
                    <p className='flex justify-center text-secondary text-base'>{currentWeather.stateName}, {currentWeather.countryName}</p>
                    <div className='w-full flex justify-center'>
                        {currentWeather.status_image != '' ? (<img
                            className='w-52' src={require(`../assests/weather_status_image/${currentWeather.status_image}`)}
                        />) : (
                            <></>
                        )}
                    </div>
                    <div className='flex justify-around'>
                        <div>
                            <div className='flex'>
                                <svg className="fill-secondary w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 512 512">
                                    <path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z">
                                    </path>
                                </svg>
                                <p className="text-secondary text-sm ps-2">Wind speed</p>
                            </div>
                            <p className="text-3xl font-bold text-text">{currentWeather.wind_speed} km/h</p>
                        </div>
                        <div>
                            <div className=''>
                                <div className='flex'>
                                    <svg className="fill-secondary w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 256 512">
                                        <path d="M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V224c0-17.673 14.327-32 32-32s32 14.327 32 32v104.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"></path></svg>
                                    <p className="text-secondary text-sm">Temperature</p>
                                </div>
                                <p className="text-3xl font-bold text-text">{currentWeather.temp}°</p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >)
        )
    );
}
