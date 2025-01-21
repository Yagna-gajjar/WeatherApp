import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import Input from './components/Input';
import Button from './components/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const api = useSelector((state) => state.api.url);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const toggleVisible = () => {
        setIsVisible(!isVisible);
    };

    const nav = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasNumber) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }
        return null;
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            setSuccess(false);
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setSuccess(false);
            return;
        }

        try {
            const response = await axios.post(`${api}/api/signin`, { email, password });

            if (response.data.success) {
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("token", response.data.token);
                setSuccess(true);
                setError(null);

                nav('/admin/listAllCities')
            } else {
                setError(response.data.message || 'Sign-in failed.');
                setSuccess(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="mx-5 flex flex-col justify-center items-center h-screen w-full">
            <div className="w-[90%] md:w-[70%] lg:w-[50%] my-2">
                <Input
                    placeholder="Email"
                    type="email"
                    preicon={<EmailIcon />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="w-[90%] md:w-[70%] lg:w-[50%] my-2">
                <Input
                    placeholder="Password"
                    type={isVisible ? 'text' : 'password'}
                    preicon={<KeyIcon />}
                    posticon={isVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    postfun={toggleVisible}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {success && <p className="text-green-500">Sign-in successful!</p>}

            <div className="my-2">
                <Button value="Sign In" fun={handleSignIn} />
            </div>
        </div>
    );
}
