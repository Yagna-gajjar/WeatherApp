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
            cd(null, '../src/assets/images')
        },
        filename: function (req, file, cd) {
            cd(null, file.originalname);
        }
    }
)

export const upload = multer({ storage });

export const signup = async (req, res) => {
    try {
        const { username, email, password, city, state, country, profilePic } = req.body;

        const citydata = await cities.findOne({ cityName: city });
        const isUserExist = await users.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({
            username,
            email,
            password: hashedPassword,
            city,
            state,
            country,
            profilePic,
            role: 'user',
        });
        const token = generateToken(user);
        res.status(201).json({ message: 'Signup successful', token, user, citydata });
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
        console.log(city);

        const citydata = await cities.findOne({ cityName: city });
        console.log(citydata);


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Signin successful!!', token, user, citydata });
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ error: 'Error signing in the user.' });
    }
};
