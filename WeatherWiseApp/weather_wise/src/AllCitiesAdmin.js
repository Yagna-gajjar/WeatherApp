import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminProfile from './AdminProfile';
import HomeIcon from '@mui/icons-material/Home';

export default function AllCitiesAdmin() {
    const api = useSelector((state) => state.api.url);
    const AdminDate = useSelector((state) => state.AdminDate.citiyDate);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [cities, setCities] = useState([]);
    const [editing, setEditing] = useState(null);
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
        <div className='h-screen overflow-hidden'>
            <AdminProfile />
            <div className='m-3 md:m-5 lg:m-7'>
                <div className='text-text flex justify-center items-center'>
                    <div onClick={() => {
                        document.getElementById('profile').classList.remove('-left-[100%]')
                        document.getElementById('profile').classList.add('left-0')
                    }}>
                        <AccountCircleIcon />
                    </div>
                    <div className='text-text flex justify-center items-center ps-3' onClick={() => {
                        nav('/')
                    }}>
                        <HomeIcon />
                    </div>
                    <input type="text" onChange={handleSearchChange} placeholder="search city" className="border bg-transparent mx-3 w-full placeholder-secondary border-border rounded-full outline-none text-text px-5 py-1" />
                </div>
                <div className='h-screen overflow-y-scroll mt-4'>
                    {
                        filteredCities.map((data) => {
                            return (
                                <div onClick={() => {
                                    nav(`/admin/manageweather/${data.cityName}/${data._id}/${AdminDate}`)
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
                </div>
            </div >
        </div>
    );
}
