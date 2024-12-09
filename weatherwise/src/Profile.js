import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
    return { ...state, [action.field]: action.value };
};
export default function Profile() {
    const initialState = {
        username: '',
        email: '',
        city: '',
        state: '',
        country: '',
        profilePic: '',
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const email = localStorage.getItem("email");
    const nav = useNavigate();

    const logout = () => {
        localStorage.removeItem("email")
        localStorage.removeItem("city_id")
        localStorage.removeItem("role")
        nav('/')
    }

    const role = localStorage.getItem('role')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/oneuser/${email}`);

                if (response.status === 200) {
                    const profileData = response.data.oneuser;

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
        <div className='w-1/4 h-screen bg-slate-950 bg-opacity-35 p-5'>
            <div className='flex flex-col items-center h-full'>
                <img className='w-44 h-44 rounded-full' src={state.profilePic ? require(`./assets/images/${state.profilePic}`) : require('./assets/images/default.png')} />
                <Link to={'/editProfile'}><button className='bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 px-3 py-1 rounded-2xl mt-3 mb-4'>Edit Profile</button></Link>
                <p className='text-2xl text-slate-400  py-2'>{state.username}</p>
                <div className='text-slate-500 flex flex-col items-start'>
                    <p className='py-2'>Email: {state.email}</p>
                    <p className='py-2'>city: {state.city}</p>
                    <p className='py-2'>state: {state.state}</p>
                    <p className='py-2'>country: {state.country}</p>
                    {
                        role == 'admin' ? (
                            <>
                                <p className=''>role: admin</p>
                                <Link to={'/WeatherTable'} className='text-xs bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 px-3 py-1 rounded-2xl mt-3 mb-4'>Manage Weather Data</Link>
                                <p></p>
                            </>
                        ) : (<></>)
                    }
                </div>
                <button onClick={logout} className='text-xs bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 px-3 py-1 rounded-2xl mt-3 mb-4'>log out</button>
            </div>
        </div >
    );
}
