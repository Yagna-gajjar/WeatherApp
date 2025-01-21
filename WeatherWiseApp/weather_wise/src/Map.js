import React, { useEffect, useState } from 'react';
import Citydisplay from './components/Citydisplay';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Map() {
    const cityId = useSelector((state) => state.searchedCity.cityId);
    const [relatedCities, setRelatedCities] = useState([]);
    const api = useSelector((state) => state.api.url);
    useEffect(() => {
        fetchCites();
    }, [])

    const fetchCites = async () => {
        const response = await axios.get(`${api}/api/Weatherstatewise/${cityId}/2024-12-22`)
        setRelatedCities(response.data.weather);
    }

    return (
        <div className='flex flex-col lg:flex-row h-screen'>
            <iframe className='w-full lg:w-2/3 h-52 lg:h-screen p-6' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29919311035!2d72.4149272437144!3d23.02015808155443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1734695284098!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div className='w-full lg:w-1/3'>
                <Citydisplay List={relatedCities} />
            </div>
        </div>
    );
}
