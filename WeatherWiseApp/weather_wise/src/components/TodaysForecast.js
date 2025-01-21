import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

function SkeletonLoad() {
    const [screenWeight, setScreenWeight] = useState(0);

    useEffect(() => {
        setScreenWeight(window.innerWidth);
        const handleResize = () => setScreenWeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='pe-7'>
            <Skeleton sx={{ bgcolor: 'grey.700' }} variant='rounded' width={screenWeight * 0.65} height={150} />
        </div>
    )
}

export default function TodaysForecast(props) {
    const { backgroundcolor } = props;
    const [isLoading, setIsLoading] = useState(true);
    const mode = useSelector((state) => state.mode.value);
    const api = useSelector((state) => state.api.url);
    const [todaysData, setTodaysData] = useState([])
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const response = await axios.get(
            `${api}/api/Weathercitydatewise/674e0418a6b239ebfb81958b/2024-12-19`
        )
        setTodaysData(response.data.weather.hourly)
    }
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        setIsLoading(true)
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        setIsLoading(false)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        screenSize.width > 500 ? (
            isLoading ? (
                <SkeletonLoad />
            ) : (
                <div className={`py-4 px-2 min-[1130px]:px-3 xl:px-5 bg-${backgroundcolor} rounded-2xl font-rubik`}>
                    <p className="font-semibold text-[10px] min-[1130px]:text-xs xl:text-sm text-secondary uppercase">
                        Today's Forecast
                    </p>
                    <div className="flex py-5 overflow-x-scroll">
                        {todaysData.map((data, index) => {
                            if (index % 3 == 0) {
                                return (
                                    <div
                                        key={index}
                                        className={`${index == 0 ? 'border-none' : 'border-s border-border'
                                            } px-5`}
                                    >
                                        <p className="font-rubik flex justify-center items-center text-[10px] xl:text-xs font-semibold text-secondary">
                                            {data.time}
                                        </p>
                                        <div className="w-12 h-12 min-[1130px]:w-14 min-[1130px]:h-14 xl:w-16 xl:h-16 flex justify-center items-center">
                                            <img
                                                className=""
                                                src={require('../assests/weather_status_image/' + data.status_image + '.png')}
                                                alt="Weather status"
                                            />
                                        </div>
                                        <p className="flex justify-center items-center text-text font-bold text-sm min-[1130px]:text-base xl:text-lg">
                                            {data.temperature}°
                                        </p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div >)

        ) : (
            <div className={`text-xs bg-${backgroundcolor} font-semibold rounded-2xl`}>
                <p className="uppercase text-text text-xl">Today's forecast</p>
                <div className='flex flex-col'>
                    {
                        todaysData.map((data, index) => {
                            return (
                                <div
                                    key={data.day}
                                    className={`flex justify-between h-20 items-center capitalize ${index === 0 ? 'border-none' : `border-t border-border`}`}
                                >
                                    <p className="text-secondary">{data.time}</p>
                                    <p className="text-text font-bold text-lg">{data.temperature}°</p>
                                    <div className='w-14 flex justify-start'>
                                        <img className='' src={require(`../assests/weather_status_image/${data.status_image}.png`)} alt={data.status_image} />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>)
    );
}   
