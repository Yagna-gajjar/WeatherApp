import React, { useEffect, useState } from 'react';
import Citydisplay from './components/Citydisplay';
import axios from 'axios';
import SideBar from './components/SideBar';
import ModeToggle from './components/ModeToggle';
import { Link } from 'react-router-dom';

export default function Map() {

    const [relatedCities, setRelatedCities] = useState([])
    useEffect(() => {
        fetchCites();
    }, [])

    const fetchCites = async () => {
        const response = await axios.get("http://localhost:5000/api/Weatherstatewise/674e01af950367e8c392b293/2024-12-22")
        setRelatedCities(response.data.weather);
    }

    return (
        <div className='flex flex-col lg:flex-row h-screen'>
            {/* <div className='flex'>
                <div className='pe-2'>
                    <SideBar />
                </div>
                <Link to={'/cityList'} className='w-8/12 bg-primary rounded-xl p-2 border-none outline-none text-secondary'>Search for cities</Link>
                <ModeToggle />
            </div> */}
            <iframe className='w-full lg:w-2/3 h-52 lg:h-screen p-6' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29919311035!2d72.4149272437144!3d23.02015808155443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1734695284098!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div className='w-full lg:w-1/3'>
                <Citydisplay List={relatedCities} />
            </div>
        </div>
    );
}
