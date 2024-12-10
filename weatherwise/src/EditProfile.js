import React, { useReducer, useEffect, useRef, useState } from 'react';
import DefaultProfile from './assets/images/default.png';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  return { ...state, [action.field]: action.value };
};

export default function EditProfile() {
  const initialState = {
    username: '',
    email: '',
    city: '',
    state: '',
    country: '',
    profilePic: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const fileInputRef = useRef(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const [profilePic, setProfilePic] = useState(DefaultProfile);

  const [file, setFile] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    const myfile = e.target.files[0];
    if (myfile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(myfile);
    }
    dispatch({ field: e.target.name, value: e.target.files[0].name });
  };

  const handleEditProfile = async () => {
    const { email, ...profileData } = state;
    profileData['profilePic'] = file.name || 'default.png';
    profileData['file'] = file;

    try {
      const response = await axios.put(
        `https://weatherapp-dnc3.onrender.com/api/editprofile/${email}`,
        profileData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      );

      if (response.status === 200) {
        alert('Profile updated successfully!');
        nav('/index');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile!');
    }
  };
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityInput = (e) => {
    const input = e.target.value;
    dispatch({ field: 'city', value: input });
    if (input) {
      const filtered = cities.filter(city =>
        city.cityName.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    dispatch({ field: 'city', value: city.cityName });
    dispatch({ field: 'state', value: city.stateID.stateName });
    dispatch({ field: 'country', value: city.countryID.countryName });
    setSelectedCity(city);
    localStorage.setItem('city_id', city._id);
    setFilteredCities([]);
  };

  const email = localStorage.getItem("email")
  useEffect(() => {
    const fetchCities = async () => {
      const cityres = await axios.get("https://weatherapp-dnc3.onrender.com/api/city");
      setCities(cityres.data.cities);
    };
    fetchCities();
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://weatherapp-dnc3.onrender.com/api/oneuser/${email}`);

        if (response.status === 200) {
          const profileData = response.data.oneuser;
          const pp = require('./assets/images/' + profileData.profilePic)
          setProfilePic(pp)


          for (const [field, value] of Object.entries(profileData)) {
            dispatch({ field, value });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className='py-5 flex flex-col items-center'>
      <div className='relative w-44 h-44 group'>
        <img
          className='rounded-full w-44 h-44'
          src={profilePic}
          // src={state.profilePic ? require(`./assets/images/${state.profilePic}`) : require('./assets/images/default.png')}
          alt='Profile'
        />

        <div
          className='w-44 h-44 absolute top-0 left-0 bg-opacity-45 bg-slate-950 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
          onClick={() => fileInputRef.current.click()}>
          <FaEdit size={40} style={{ color: '#030A2E' }} />
        </div>

        <input
          type='file'
          name='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleFileChange}
        />
      </div>

      <div className='flex flex-col my-3'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={state.username}
          onChange={handleChange}
          className='w-96 placeholder-slate-600 bg-transparent text-slate-300 border bottom-1 border-slate-400 rounded-xl my-3 py-1 px-3'
        />
        <input
          type='text'
          name="city"
          placeholder='City Name'
          value={state.city}
          onChange={handleCityInput}
          className='w-full placeholder-slate-400 bg-transparent text-slate-400 border bottom-1 border-slate-600 rounded-xl my-3 py-1 px-3'
        />
        {filteredCities.length > 0 && (
          <ul className="w-96 bg-white shadow-lg max-h-40 overflow-y-auto rounded-lg">
            {filteredCities.map((city) => (
              <li
                key={city.cityName}
                onClick={() => handleCitySelect(city)}
                className="px-3 py-2 cursor-pointer hover:bg-slate-300"
              >
                {city.cityName}, {city.stateID.stateName}, {city.countryID.countryName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleEditProfile}
        className='text-xs bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 px-3 py-1 rounded-2xl mt-3 mb-4'
      >
        Edit Profile
      </button>
    </div>
  );
}