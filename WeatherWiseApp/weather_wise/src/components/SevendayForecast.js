import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

export default function SevendayForecast(props) {
    const { backgroundcolor, width } = props;
    const mode = useSelector((state) => state.mode.value);
    const [sevendayData, setSevendayData] = useState([]);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [today, setToday] = useState(new Date());
    useEffect(() => {
        fetchData();
    }, [today]);

    const fetchData = async () => {
        const response = await axios.post('http://localhost:5000/api/weatherofweek/674e042ca6b239ebfb81958e',
            { "timenow": today.getHours(), "today": today.getDay() }
        )
        setSevendayData(response.data.sevenday);
    }
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
        screenSize.width > 1024 ? (
            <div className={`${width} mt-2 text-[10px] min-[1130px]:text-xs bg-${backgroundcolor} font-semibold rounded-2xl ms-7 px-7 pt-6 pb-2`}>
                <p className="uppercase text-secondary">7-day forecast</p>
                <div className='flex flex-col'>
                    {
                        sevendayData.map((data, index) => {
                            return (
                                <div
                                    key={data.day}
                                    className={`flex justify-between h-[72px] items-center capitalize ${index === 0 ? 'border-none' : `border-t border-border`}`}
                                >
                                    <p className="text-secondary">{data.day === today ? 'today' : data.day}</p>
                                    <div className='w-14 flex justify-start'>
                                        <img className='' src={require(`../assests/weather_status_image/${data.status_image}.png`)} alt={data.status} />
                                    </div>
                                    <p className="text-text">{data.status}</p>
                                    <p className="text-secondary">
                                        <span className="text-text">{data.max_temp}</span>/{data.min_temp}
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>) : (
            <div className={`py-4 px-2 min-[1130px]:px-3 xl:px-5 bg-${backgroundcolor} rounded-2xl font-rubik `}>
                <p className=" font-semibold text-[10px] min-[1130px]:text-xs xl:text-sm text-secondary uppercase">Seven's Forecast</p>
                <div className='flex justify-between py-5 overflow-x-scroll '>
                    {sevendayData.map((data, index) => {
                        return (
                            <div className={`${index == 0 ? 'border-none' : 'border-s border-border'} px-4`}>
                                <p className="font-rubik flex justify-center items-center text-[10px] xl:text-xs font-semibold  text-secondary">{data.day}</p>
                                {/* <p className="font-rubik flex justify-center items-center text-[10px] xl:text-xs font-semibold  text-secondary">{data.day === today ? 'today' : data.day}</p> */}
                                <div className='w-12 h-12 min-[1130px]:w-14 min-[1130px]:h-14 xl:w-16 xl:h-16 flex justify-center items-center'>
                                    <img className='' src={require('../assests/weather_status_image/' + data.status_image + '.png')} />
                                </div>
                                <p className="font-rubik flex justify-center items-center text-[10px] xl:text-xs font-semibold  text-secondary">{data.status}</p>
                                <p className="flex justify-center items-center text-secondary font-bold text-sm min-[1130px]:text-base xl:text-lg">
                                    <span className="text-text">{data.max_temp}</span>/{data.min_temp}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div >)
    );
}