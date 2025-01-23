import mongoose from 'mongoose';
import users from '../model/userModel.js';
import cities from '../model/cityModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from "multer";

dotenv.config();
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const storage = multer.diskStorage(
    {
        destination: function (req, file, cd) {
            cd(null, '../weather_wise/src/assests/Users')
        },
        filename: function (req, file, cd) {
            cd(null, file.originalname);

        }
    }
)

export const upload = multer({ storage });

export const signup = async (req, res) => {
    try {
        const { username, email, password, cityId, profilePic } = req.body;
        const citydata = await cities.findOne({ _id: cityId });
        const isUserExist = await users.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({
            username,
            email,
            password: hashedPassword,
            cityId,
            profilePic
        });
        const token = generateToken(user);
        res.status(201).json({ message: 'Signup successful', success: true, token, user, citydata });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: 'Error signing up the user.' });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ email });
        const city = user.city
        const citydata = await cities.findOne({ cityName: city });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Signin successful!!', success: true, token, user, citydata });
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ error: 'Error signing in the user.' });
    }
};

const verifyTokenAndEmail = async (token, email) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await users.findOne({ email });

        if (!user) {
            return false;
        }

        return decoded.email === email;
    } catch (error) {
        return false;
    }
}

export const verifyUser = (req, res) => {
    const { token, email } = req.body;
    if (!token || !email) {
        return res.status(400).json({ success: false, message: 'Token and email are required.' });
    }

    const isValid = verifyTokenAndEmail(token, email);

    if (isValid) {
        return res.json({ success: true, message: 'User verified successfully.' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid token or email.' });
    }
};
