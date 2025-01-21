import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AllCitiesAdmin() {
    const api = useSelector((state) => state.api.url);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [cities, setCities] = useState([]);
    const nav = useNavigate();
    const fetchCities = async () => {
        try {
            const res = await axios.get(`${api}/api/city`)
            setCities(res.data.cities);
            setFilteredCities(res.data.cities);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
    useEffect(() => {
        fetchCities();
    }, []);
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = cities.filter(city =>
            city.cityName.toLowerCase().includes(query) ||
            city.stateID.stateName.toLowerCase().includes(query) ||
            city.countryID.countryName.toLowerCase().includes(query)
        );
        setFilteredCities(filtered);
    };
    return (

        <div className='m-3 md:m-5 lg:m-7'>
            <input type="text" onChange={handleSearchChange} placeholder="search city" className="border bg-transparent mb-4 w-full placeholder-secondary border-border rounded-full outline-none text-text px-5 py-1" />
            {
                filteredCities.map((data) => {
                    return (
                        <div onClick={() => {
                            nav(`/admin/manageweather/${data.cityName}/${data._id}`)
                        }} className='bg-primary rounded-2xl my-3 p-3 font-rubik capitalize'>
                            <div className='flex items-center justify-between w-full' component="span">
                                <div className="flex items-center">
                                    <div className='mx-5'>
                                        <p className="text-text font-bold text-2xl">{data.cityName}</p>
                                        <p className="text-secondary ">{data.stateID.stateName}, {data.countryID.countryName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div >
    );
}
