import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayWeather() {
    const city_id = localStorage.getItem("city_id");
    const role = localStorage.getItem("role");

    const onecity = {
        cityName: "",
        state: "",
        country: "",
        temperature: []
    };

    const [onecityData, setOneCityData] = useState(onecity);
    const [citiesData, setCitiesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);

    useEffect(() => {
        const fetchDataofyourcity = async () => {
            const response = await axios.get('http://localhost:5000/api/cityone/' + city_id);
            setOneCityData(response.data.city);
        };
        fetchDataofyourcity();

        const fetchDataofallcity = async () => {
            const response = await axios.get('http://localhost:5000/api/city');
            setCitiesData(response.data.cities);
            setFilteredCities(response.data.cities);
        };
        fetchDataofallcity();
    }, [city_id]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = citiesData.filter(city =>
            city.cityName.toLowerCase().includes(query) ||
            city.state.toLowerCase().includes(query) ||
            city.country.toLowerCase().includes(query)
        );
        setFilteredCities(filtered);
    };
    const nav = useNavigate()
    const handleAddCity = () => {
        nav('/addeditCity')
    };

    const handleEditCity = (cityId) => {
        nav(`/addeditCity/${cityId}`);
    };

    const handleDeleteCity = async (cityId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the city`);
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/city/${cityId}`);
            setCitiesData(citiesData.filter((city) => city._id !== cityId));
            setFilteredCities(filteredCities.filter((city) => city._id !== cityId))
        } catch (error) {
            console.error('Error deleting city:', error);
            alert('Failed to delete the city. Please try again.');
        }
    };

    return (
        <div className='w-3/4 flex flex-col items-center h-screen'>
            <div className='text-amber-800 w-full mb-5 p-5'>
                <p className='text-2xl'>Your City: <span>{onecityData.cityName}</span><span className='text-sm'>, {onecityData.state}</span><span className='text-sm'>, {onecityData.country}</span></p>
                <div className='text-xl flex overflow-x-scroll'>
                    {onecityData.temperature.length > 0 ? (
                        onecityData.temperature.map((temp, index) => (
                            <div key={index} className='px-8 py-3 m-3 rounded-2xl bg-amber-900 bg-opacity-35'>
                                <div className="text-center text-sm pb-4 flex items-center justify-center">
                                    <span>hour:</span>
                                    <span className="ml-1">{index + 1}</span>
                                </div>
                                <p>{temp}°C</p>
                            </div>
                        ))
                    ) : (
                        <span>No temperature data available.</span>
                    )}
                </div>
            </div>
            <div className='w-2/3'>
                <input
                    placeholder='Search city'
                    className='border placeholder-amber-900 w-full border-amber-800 bg-amber-800 rounded-2xl outline-none text-amber-700 px-5 py-1 bg-opacity-25'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

            </div>
            {role === "admin" && (
                <button
                    className='mt-3 bg-amber-800 text-white px-4 py-2 rounded-xl'
                    onClick={handleAddCity}
                >
                    Add City
                </button>
            )}
            <div className='w-full overflow-y-scroll mt-5'>
                {
                    filteredCities.length > 0 ? (
                        filteredCities.map((city, index) => (
                            <div key={index} className='text-amber-800 w-full px-5'>
                                <div className='flex '>
                                    <p className='text-2xl'>{city.cityName}<span className='text-sm'>, {city.state}</span><span className='text-sm'>, {city.country}</span></p>

                                    {role === "admin" && (
                                        <div className='flex space-x-3 mt-2 mx-3'>
                                            <button
                                                className='bg-blue-950 text-white px-3 py-1 rounded-lg'
                                                onClick={() => handleEditCity(city._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='bg-red-950 text-white px-3 py-1 rounded-lg'
                                                onClick={() => handleDeleteCity(city._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className='text-xl flex overflow-x-scroll'>

                                    {city.temperature.length > 0 ? (
                                        city.temperature.map((temp, index) => (
                                            <div key={index} className='px-8 py-3 m-3 rounded-2xl bg-amber-900 bg-opacity-35'>
                                                <div className="text-center text-sm pb-4 flex items-center justify-center">
                                                    <span>hour:</span>
                                                    <span className="ml-1">{index + 1}</span>
                                                </div>
                                                <p>{temp}°C</p>
                                            </div>
                                        ))
                                    ) : (
                                        <span>No temperature data available.</span>
                                    )}
                                </div>

                            </div>
                        ))
                    ) : (
                        <span>No Cities data found</span>
                    )
                }
            </div>
        </div>
    );
}
