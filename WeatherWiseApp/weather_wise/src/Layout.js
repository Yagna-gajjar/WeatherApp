import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setSerchedCity, toggleMode } from "./Store";
import ModeToggle from './components/ModeToggle';
import axios from 'axios';

export default function Layout() {
    const mode = useSelector((state) => state.mode.value);
    const api = useSelector((state) => state.api.url);
    const dispatch = useDispatch();
    const [timenow, setTimenow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTimenow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        document.body.classList = mode;
    }, [mode]);

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

    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCities = async () => {
        try {
            const response = await axios.get(`${api}/api/Weatherdatewise/2024-12-22`);
            setCities(response.data.weather);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const nav = useNavigate();

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCities([]);
        } else {
            const filtered = cities.filter((city) =>
                city.cityID.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                city.cityID.stateID.stateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                city.cityID.countryID.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCities(filtered);

        }
    }, [searchTerm, cities]);


    const renderSearchResults = () => (
        <div className='absolute z-10 my-10 bg-secondary'>
            {filteredCities.map((data) => (
                <p className='text-primary' key={data.cityID?.id || Math.random()}>
                    {data.cityID?.cityName},
                    {data.cityID?.stateID.stateName},
                    {data.cityID?.countryID.countryName},
                </p>
            ))}
        </div>
    );

    const renderTime = () =>
        `${timenow.getDate()}-${timenow.getMonth() + 1}-${timenow.getFullYear()}, ${timenow.getHours()}:${timenow.getMinutes()}:${timenow.getSeconds()}`;

    return (
        screenSize.width > 500 ? (
            <div className='flex px-5 pt-5'>
                <div className=''>
                    <SideBar />
                </div>
                <div className='w-full p-1 md:ps-5 flex flex-col justify-center'>
                    <div className='flex w-full'>
                        <div className='flex w-8/12'>
                            <input
                                className="bg-primary w-full rounded-xl p-2 border-none outline-none text-text placeholder:text-secondary"
                                placeholder="Search for cities"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='absolute max-h-52 my-12 z-10 overflow-y-scroll bg-secondary rounded-xl'>{
                                filteredCities.map((data) => {
                                    return (
                                        <p onClick={() => {
                                            dispatch(setSerchedCity(data.cityID._id))
                                            setSearchTerm("")
                                            nav('/cityList')
                                        }} className='text-primary font-bold text-base py-1 px-3 hover:cursor-pointer hover:bg-border'>{data.cityID.cityName},<span className='text-opacity-45 font-normal text-sm'>{data.cityID?.stateID.stateName},{data.cityID?.countryID.countryName}</span></p>
                                    )
                                })
                            }</div>
                        </div>
                        <div className='flex w-4/12 justify-around'>
                            <ModeToggle />
                            <p className='p-2 text-text'>{timenow.getDate() + '-' + (timenow.getMonth() + 1) + '-' + timenow.getFullYear() + ', ' + timenow.getHours() + ':' + timenow.getMinutes() + ':' + timenow.getSeconds()}</p>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>) : (
            <div className='w-full p-5 flex flex-col'>
                <div>
                    <div className='flex items-center justify-center'>
                        <div className='pe-2'>
                            <SideBar />
                        </div>
                        <input
                            className="bg-primary w-full rounded-xl p-2 border-none outline-none text-text placeholder:text-secondary"
                            placeholder="Search for cities"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className='absolute top-16 left-12 max-h-52 z-10 overflow-y-scroll bg-secondary rounded-xl'>{
                            filteredCities.map((data) => {
                                return (
                                    <p onClick={() => {
                                        dispatch(setSerchedCity(data.cityID._id))
                                        setSearchTerm("")
                                        nav('/cityList')
                                    }} className='text-primary font-bold text-base py-1 px-3 hover:cursor-pointer hover:bg-border'>{data.cityID.cityName},<span className='text-opacity-45 font-normal text-sm'>{data.cityID?.stateID.stateName},{data.cityID?.countryID.countryName}</span></p>
                                )
                            })
                        }</div>
                        <div className='px-4'>
                            <ModeToggle />
                        </div>
                    </div>
                    <p className='p-2 text-text'>{timenow.getDate() + '-' + (timenow.getMonth() + 1) + '-' + timenow.getFullYear() + ', ' + timenow.getHours() + ':' + timenow.getMinutes() + ':' + timenow.getSeconds()}</p>

                </div>
                <Outlet />
            </div>)
    );
}
