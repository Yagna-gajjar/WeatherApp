import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayWeather() {
    const [Loader, setLoader] = useState(false);
    const [city_id, setCity_id] = useState(localStorage.getItem("city_id"));
    const role = localStorage.getItem("role");
    const oneCity = {
        cityName: "",
        stateName: "",
        countryName: "",
        date: Date,
        temperature: []
    };
    const [onecityData, setOneCityData] = useState(oneCity);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [datelist, setDatelist] = useState([]);
    const [date, setDate] = useState("2024-12-03");

    useEffect(() => {
        const fetchDataofyourcity = async () => {
            setLoader(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/Tempcitydatewise/${city_id}/${date}`);
                const newCityData = {
                    cityName: response.data.temp.cityID.cityName,
                    stateName: response.data.temp.stateID.stateName,
                    countryName: response.data.temp.countryID.countryName,
                    date: response.data.temp.date,
                    temperature: response.data.temp.temperature,
                };
                setOneCityData(newCityData);
            } catch (error) {
                console.error('Error fetching city data:', error);
                setOneCityData({});
            } finally {
                setLoader(false);
            }
        };

        const fetchDataofallcity = async () => {
            setLoader(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/Tempdatewise/${date}`);
                const newCitiesData = response.data.temp.map(res => ({
                    cityName: res.cityID.cityName,
                    stateName: res.stateID.stateName,
                    countryName: res.countryID.countryName,
                    date: res.date,
                    temperature: res.temperature
                }));

                setCitiesData([...newCitiesData]);
                setFilteredCities([...newCitiesData]);
            } catch (error) {
                console.error('Error fetching all city data:', error);
            } finally {
                setLoader(false);
            }
        };

        const fetchDates = async () => {
            setLoader(true);
            try {
                const response = await axios.get('http://localhost:5000/api/listDates');
                setDatelist([...response.data.dates]);
            } catch (error) {
                console.error('Error fetching dates:', error);
            } finally {
                setLoader(false);
            }
        };

        fetchDataofyourcity();
        fetchDataofallcity();
        fetchDates();

    }, [city_id, date]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = citiesData.filter(city =>
            city.cityName.toLowerCase().includes(query) ||
            city.stateName.toLowerCase().includes(query) ||
            city.countryName.toLowerCase().includes(query)
        );
        setFilteredCities(filtered);
    };

    const nav = useNavigate();

    return (
        <div className='w-3/4 flex flex-col items-center h-screen'>
            {Loader && <div className="loader">Loading...</div>}
            <div className='text-slate-400 w-full mb-5 p-5'>
                <div className='flex justify-between items-center'>
                    <p className='text-2xl'>Your City: <span>{onecityData.cityName}</span><span className='text-sm'>, {onecityData.stateName}</span><span className='text-sm'>, {onecityData.countryName}</span></p>
                    <p className=''>
                        <select
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }} className='bg-slate-400 bg-opacity-25 text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500'>
                            {datelist.map((date, index) => {
                                return (
                                    <option key={index} className='bg-slate-500 text-slate-200' value={date.split('T')[0]}>
                                        {date.split('T')[0]}
                                    </option>
                                );
                            })}
                        </select>

                    </p>
                </div>
                <div className="flex overflow-x-auto">
                    {onecityData.temperature && onecityData.temperature.length > 0 ? (
                        onecityData.temperature.map((temp, index) => (
                            <div
                                key={index}
                                className="bg-slate-400 bg-opacity-25 rounded-xl py-3 m-3 text-center min-w-32 h-24 flex flex-col justify-between items-center"
                            >
                                <span>{temp.range}</span>
                                <span>{temp.temperature}°C</span>
                            </div>
                        ))
                    ) : (
                        <p className='text-slate-400 flex justify-center items-center'>No temperature data available</p>
                    )}
                </div>

            </div>
            <div className='w-2/3'>
                <input
                    placeholder='Search city'
                    className='border placeholder-slate-500 w-full border-slate-400 bg-slate-400 rounded-2xl outline-none text-slate-400 px-5 py-1 bg-opacity-25'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='w-full overflow-y-scroll mt-5'>
                {
                    filteredCities.length > 0 ? (
                        filteredCities.map((city, index) => (
                            <div key={index} className='text-slate-400 w-full px-5'>
                                <div className=''>
                                    <p className='text-2xl'>{city.cityName}<span className='text-sm'>, {city.stateName}</span><span className='text-sm'>, {city.countryName}</span></p>
                                    <div className='flex overflow-x-auto'>
                                        {
                                            city.temperature.map((temp, index) => (
                                                <div key={index} className='bg-slate-400 bg-opacity-25 rounded-xl py-3 m-3 text-center min-w-32 h-24 flex flex-col justify-between items-center'>
                                                    {temp.range}
                                                    <p>{temp.temperature}°C</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className='text-slate-400 flex justify-center items-center'>No Cities data found</span>
                    )
                }
            </div>
        </div>
    );
}
