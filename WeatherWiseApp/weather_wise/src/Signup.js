import React, { useEffect, useReducer, useState, useRef } from 'react';
import axios from 'axios';
import DefaultProfile from './assests/Users/default.png';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Input from './components/Input';
import Button from './components/Button';
import { useSelector } from 'react-redux';

export default function SignUp() {
    const api = useSelector((state) => state.api.url);
    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        cityId: "",
        profilePic: "default.png"
    };
    function reducer(state, action) {
        return { ...state, [action.field]: action.value };
    }

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => {
        setIsVisible(!isVisible);
    };

    const [user, dispatch] = useReducer(reducer, initialState);
    const [validationErrors, setValidationErrors] = useState({});
    const nav = useNavigate();
    const fileInputRef = useRef(null);
    const handleChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value });
        setValidationErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    };
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.username.trim()) {
            errors.username = "Username is required.";
        }
        if (!user.email.trim() || !emailRegex.test(user.email)) {
            errors.email = "A valid email is required.";
        }
        if (user.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }
        if (user.password !== user.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        if (!user.city.trim()) {
            errors.city = "City is required.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSignUp = async () => {
        if (!validateForm()) return;
        try {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('cityId', user.cityId);
            formData.append('profilePic', file.name || 'default.png');
            formData.append('file', file);

            const response = await axios.post(`${api}/api/signup`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 201) {
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("token", response.data.token);
                nav('/admin');
            } else if (response.status === 400) {
                alert("User already exists");
            } else {
                alert(response.data.message || "Sign-up failed!");
            }
        } catch (error) {
            alert("Error signing up: " + (error.response?.data?.message || error.message));
        }
    };

    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [profilePic, setProfilePic] = useState(DefaultProfile);

    useEffect(() => {
        const fetchCities = async () => {
            const cityres = await axios.get(`${api}/api/city`);
            setCities(cityres.data.cities);
        };
        fetchCities();
    }, []);

    const handleCityInput = (e) => {
        const input = e.target.value;
        dispatch({ field: 'city', value: input });
        if (input) {
            const filtered = cities.filter(city =>
                city.cityName.toLowerCase().includes(input.toLowerCase()) ||
                city.stateID.stateName.toLowerCase().includes(input.toLowerCase()) ||
                city.countryID.countryName.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCitySelect = (city) => {
        dispatch({ field: 'cityId', value: city._id });
        dispatch({ field: 'city', value: `${city.cityName}, ${city.stateID.stateName}, ${city.countryID.countryName}` });

        setSelectedCity(city);
        setFilteredCities([]);
    };

    const [file, setFile] = useState({});

    const handleEditProfilePic = (e) => {
        setFile(e.target.files[0]);
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
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col lg:gap-y-0 lg:justify-evenly w-[90%] h-screen lg:w-[50%]'>
                <div className='flex flex-col my-10 lg:my-0 items-center justify-center'>
                    <div className='relative w-44 h-44 group'>
                        <img
                            className='rounded-full w-44 h-44'
                            src={profilePic}
                            alt='Profile'
                        />
                        <div
                            className='w-44 h-44 absolute top-0 left-0 bg-opacity-45 bg-black rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                            onClick={() => fileInputRef.current.click()}>
                            <EditIcon />
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
                <div className='w-full flex flex-col gap-y-5'>
                    <div>
                        <Input
                            type='text'
                            name='username'
                            placeholder='UserName'
                            value={user.username}
                            onChange={handleChange}
                            preicon={<PersonIcon />}
                        />
                        {validationErrors.username && <p className="text-red-500">{validationErrors.username}</p>}
                    </div>
                    <div>
                        <Input
                            type='email'
                            name="email"
                            placeholder='Email'
                            value={user.email}
                            onChange={handleChange}
                            preicon={<EmailIcon />}
                        />
                        {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
                    </div>
                    <div>
                        <Input placeholder="Password"
                            type={isVisible ? 'text' : 'password'}
                            value={user.password}
                            name="password"
                            onChange={handleChange}
                            preicon={<KeyIcon />}
                            posticon={isVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            postfun={toggleVisible}
                        />
                        {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}
                    </div>
                    <div>
                        <Input placeholder="Confirm password"
                            type={'password'}
                            value={user.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            preicon={<KeyIcon />}
                        />
                        {validationErrors.confirmPassword && <p className="text-red-500">{validationErrors.confirmPassword}</p>}
                    </div>
                    <div className="relative">
                        <div>
                            <Input
                                id="selectedcity"
                                type='text'
                                name="city"
                                placeholder='City Name'
                                value={user.city}
                                onChange={handleCityInput}
                                preicon={<LocationCityIcon />}
                            />
                            {validationErrors.city && <p className="text-red-500">{validationErrors.city}</p>}
                        </div>
                        {filteredCities.length > 0 && (
                            <ul className="bg-white shadow-lg max-h-40 overflow-y-auto rounded-lg">
                                {filteredCities.map((city) => (
                                    <li
                                        key={city.cityName}
                                        onClick={() => {
                                            handleCitySelect(city)
                                        }}
                                        className="px-3 py-2 cursor-pointer hover:bg-text"
                                    >
                                        {city.cityName}, {city.stateID.stateName}, {city.countryID.countryName}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* {selectedCity && (
                            <div className="mt-3 text-slate-400">
                                <p>City: {selectedCity.cityName}</p>
                                <p>State: {selectedCity.stateID.stateName}</p>
                                <p>Country: {selectedCity.countryID.countryName}</p>
                            </div>
                        )} */}
                        <Link to={'/signin'} className='text-secondary'>Already have an account? <span className='hover:cursor-pointer font-bold hover:text-text'>Sign In</span></Link>
                        <div className='flex gap-7'>
                            <Button value="Sign up" fun={handleSignUp} />
                            <Button value="cancle" fun={() => {
                                nav('/')
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}