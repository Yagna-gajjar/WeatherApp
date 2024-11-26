import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/signin', {
                email: user.email,
                password: user.password
            });

            if (response.status === 200) {
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("city_id", response.data.citydata._id);
                localStorage.setItem("role", response.data.user.role);
                navigate('/index');
            } else if (response.status === 400) {
                alert('user does not exist')
            } else {
                alert('Sign-in failed!');
            }
        } catch (error) {
            alert('Error signing in: ' + (error.response?.data?.message || error.message));
        }
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center h-screen'>
                <input
                    type='email'
                    name="email"
                    placeholder='Email'
                    value={user.email}
                    onChange={handleChange}
                    className='w-96 placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl my-3 py-1 px-3'
                />
                <div className='relative w-96 my-3'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder='Password'
                        value={user.password}
                        onChange={handleChange}
                        className='placeholder-amber-950 bg-transparent text-amber-800 border bottom-1 border-amber-800 rounded-xl py-1 px-3 w-full'
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-800"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <Link to={'/signup'} className='text-amber-800'>
                    Don't have an account?{' '}
                    <span className='hover:cursor-pointer hover:text-amber-600'>
                        Sign Up
                    </span>
                </Link>
                <div>
                    <button
                        onClick={handleSignIn}
                        className='bg-amber-950 text-amber-700 px-3 py-1 rounded-2xl mt-3 mb-4 mx-3'>
                        Sign In
                    </button>
                    <button onClick={goBack} className='bg-amber-950 text-amber-700 px-3 py-1 rounded-2xl mt-3 mb-4 mx-3'>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}