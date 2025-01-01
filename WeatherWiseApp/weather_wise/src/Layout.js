import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "./Store";
import ModeToggle from './components/ModeToggle';
import axios from 'axios';

export default function Layout() {
    const mode = useSelector((state) => state.mode.value);
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
            const response = await axios.get("http://localhost:5000/api/Weatherdatewise/2024-12-22");
            setCities(response.data.weather);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

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
                    <div className='flex w-full justify-between'>
                        <div className='flex w-8/12'>
                            <input
                                className="bg-primary w-full rounded-xl p-2 border-none outline-none text-text placeholder:text-secondary"
                                placeholder="Search for cities"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='absolute z-10 my-12 bg-primary px-3 rounded-xl'>{
                                filteredCities.map((data) => {
                                    return (
                                        <p className='text-text font-bold text-base py-1'>{data.cityID.cityName},<span className='text-opacity-45 font-normal text-sm'>{data.cityID?.stateID.stateName},{data.cityID?.countryID.countryName}</span></p>
                                    )
                                })
                            }</div>
                            <ModeToggle />
                        </div>
                        <p className='p-2 text-text me-7'>{timenow.getDate() + '-' + (timenow.getMonth() + 1) + '-' + timenow.getFullYear() + ', ' + timenow.getHours() + ':' + timenow.getMinutes() + ':' + timenow.getSeconds()}</p>
                    </div>
                    <Outlet />
                </div>
            </div>) : (
            <div className='w-full p-5 flex flex-col justify-center'>
                <div>
                    <div className='flex'>
                        <div className='pe-2'>
                            <SideBar />
                        </div>
                        <input
                            className="w-8/12 bg-primary rounded-xl p-2 border-none outline-none text-text placeholder:text-secondary"
                            placeholder="Search for cities"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className='absolute z-10 my-12 bg-primary px-3 rounded-xl'>{
                            filteredCities.map((data) => {
                                return (
                                    <p className='text-text font-bold text-base py-1'>{data.cityID.cityName},<span className='text-opacity-45 font-normal text-sm'>{data.cityID?.stateID.stateName},{data.cityID?.countryID.countryName}</span></p>
                                )
                            })
                        }</div>
                        <ModeToggle />
                    </div>
                    <p className='p-2 text-text'>{timenow.getDate() + '-' + (timenow.getMonth() + 1) + '-' + timenow.getFullYear() + ', ' + timenow.getHours() + ':' + timenow.getMinutes() + ':' + timenow.getSeconds()}</p>

                </div>
                <Outlet />
            </div>)
    );
}
