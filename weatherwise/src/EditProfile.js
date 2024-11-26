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
    dispatch({ field: 'profilePic', value: e.target.files[0].name });
  };

  const handleEditProfile = async () => {
    const { email, ...profileData } = state;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/editprofile/${email}`,
        profileData
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

  const email = localStorage.getItem("email")
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/oneuser/${email}`);

        if (response.status === 200) {
          const profileData = response.data.oneuser;
          setProfilePic('./assets/images/' + profileData.profilePic)

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
          src={state.profilePic ? require(`./assets/images/${state.profilePic}`) : require('./assets/images/default.png')}
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
          className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={state.email}
          onChange={handleChange}
          className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
        />
        <input
          type='text'
          name='city'
          placeholder='City Name'
          value={state.city}
          onChange={handleChange}
          className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
        />
        <input
          type='text'
          name='state'
          placeholder='State Name'
          value={state.state}
          onChange={handleChange}
          className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
        />
        <input
          type='text'
          name='country'
          placeholder='Country Name'
          value={state.country}
          onChange={handleChange}
          className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
        />
      </div>

      <button
        onClick={handleEditProfile}
        className='bg-amber-950 text-amber-700 px-3 py-1 rounded-2xl mt-3 mb-4 mx-3'
      >
        Edit Profile
      </button>
    </div>
  );
}
