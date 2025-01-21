import express from 'express';
import { signup, signin, upload, verifyUser } from './controller/authController.js';
import { addCity, addCountry, addState, deleteCity, getAllCities, getAllCountry, getAllState, getCityById, updateCity } from './controller/cityController.js';
import { editUser, getUserByEmail } from './controller/userController.js';
import { addWeather, deleteweather, displayWeathercitywise, editWeather, displayWeather, displayWeatherdatewise, displayWeathercitydatewise, listAllDates, displaysevendaysWeather, displayWeatherdatestatewise } from './controller/weatherController.js';

const router = express.Router();

router.post('/signup', upload.single('file'), signup);
router.post('/signin', signin);
router.put('/editprofile/:findemail', upload.single('file'), editUser);
router.get('/oneuser/:findemail', getUserByEmail);
router.post('/verifyUser', verifyUser);

router.post('/city', addCity);
router.put('/state', addState);
router.post('/country', addCountry);
router.post('/temperature', addWeather);
router.put('/city/:id', updateCity);
router.delete('/city/:id', deleteCity);
router.get('/cityone/:id', getCityById);
router.get('/city', getAllCities);
router.get('/state', getAllState);
router.get('/country', getAllCountry);

router.post('/addWeather', addWeather);
router.put('/editWeather/:id', editWeather);
router.delete('/deleteWeather/:id', deleteweather);
router.get('/AllWeather', displayWeather);
router.get('/Weathercitywise/:id', displayWeathercitywise);
router.get('/Weatherdatewise/:date', displayWeatherdatewise);
router.get('/Weatherstatewise/:cityID/:date', displayWeatherdatestatewise);
router.get('/Weathercitydatewise/:id/:date', displayWeathercitydatewise);
router.post('/weatherofweek/:id', displaysevendaysWeather);
router.get('/listDates', listAllDates);

export default router;
