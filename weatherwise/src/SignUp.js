import React, { useEffect, useReducer, useState, useRef } from 'react';
import axios from 'axios';
import DefaultProfile from './assets/images/default.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';

export default function SignUp() {
    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        state: "",
        profilePic: "default.png",
        country: ""
    };

    function reducer(state, action) {
        return { ...state, [action.field]: action.value };
    }

    const [user, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value });
    };

    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [profilePic, setProfilePic] = useState(DefaultProfile);

    useEffect(() => {
        const fetchCities = async () => {
            const cityres = await axios.get("http://localhost:5000/api/city");
            setCities(cityres.data.cities);
        };
        fetchCities();
    }, []);

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
        dispatch({ field: 'state', value: city.state });
        dispatch({ field: 'country', value: city.country });
        setSelectedCity(city);
        setFilteredCities([]);
    };
    const [file, setFile] = useState({})

    const handleEditProfilePic = (e) => {
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

    const handleSignUp = async () => {
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('city', user.city);
            formData.append('state', user.state);
            formData.append('country', user.country);
            formData.append('profilePic', file.name || 'default.png');
            formData.append('file', file);

            const response = await axios.post("http://localhost:5000/api/signup", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("city_id", response.data.citydata._id);
                localStorage.setItem("role", response.data.user.role);
                navigate('/index');
            } else if (response.status === 400) {
                alert("User already exists");
            } else {
                alert(response.data.message || "Sign-up failed!");
            }
        } catch (error) {
            alert("Error signing up: " + (error.response?.data?.message || error.message));
        }
    };

    const goBack = () => {
        navigate('/');
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='relative w-44 h-44 group'>
                        <img
                            className='rounded-full w-44 h-44'
                            src={profilePic}
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
                            onChange={handleEditProfilePic}
                        />
                    </div>
                </div>
                <input
                    type='text'
                    name="username"
                    placeholder='Username'
                    value={user.username}
                    onChange={handleChange}
                    className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
                />
                <input
                    type='email'
                    name="email"
                    placeholder='Email'
                    value={user.email}
                    onChange={handleChange}
                    className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
                />
                <div className="relative w-96 my-3">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl py-1 px-3 w-full"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-800"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <input
                    type='password'
                    name="confirmPassword"
                    placeholder='Repeat Password'
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
                />
                <div className="relative w-96">
                    <input
                        type='text'
                        name="city"
                        placeholder='City Name'
                        value={user.city}
                        onChange={handleCityInput}
                        className='w-full placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
                    />
                    {filteredCities.length > 0 && (
                        <ul className="w-96 bg-white shadow-lg max-h-40 overflow-y-auto rounded-lg">
                            {filteredCities.map((city) => (
                                <li
                                    key={city.cityName}
                                    onClick={() => handleCitySelect(city)}
                                    className="px-3 py-2 cursor-pointer hover:bg-amber-100"
                                >
                                    {city.cityName}, {city.state}, {city.country}
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedCity && (
                        <div className="mt-3 text-amber-800">
                            <p>City: {selectedCity.cityName}</p>
                            <p>State: {selectedCity.state}</p>
                            <p>Country: {selectedCity.country}</p>
                        </div>
                    )}
                    <Link to={'/signin'} className='text-amber-800'>Already have an account? <span className='hover:cursor-pointer hover:text-amber-600'>Sign In</span></Link>
                    <div>
                        <button
                            onClick={handleSignUp}
                            type='submit'
                            className='bg-amber-950 text-amber-700 px-3 py-1 rounded-2xl mt-3 mb-4 mx-3'>
                            Sign Up
                        </button>
                        <button onClick={goBack} className='bg-amber-950 text-amber-700 px-3 py-1 rounded-2xl mt-3 mb-4 mx-3'>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
