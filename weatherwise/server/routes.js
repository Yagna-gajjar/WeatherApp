import express from 'express';
import { signup, signin, upload } from './controller/authController.js';
import { addCity, addCountry, addState, deleteCity, getAllCities, getAllCountry, getAllState, getCityById, updateCity } from './controller/cityController.js';
import { editUser, getUserByEmail } from './controller/userController.js';
import { addTemperature, deleteTemp, displayTempcitydatewise, displayTempcitywise, displayTempdatewise, displayWeather, editTemperature, listAllDates } from './controller/tempComtroller.js';

const router = express.Router();

router.post('/signup', upload.single('file'), signup);
router.post('/signin', signin);
router.put('/editprofile/:findemail', upload.single('file'), editUser);
router.get('/oneuser/:findemail', getUserByEmail);

router.post('/city', addCity);
router.put('/state', addState);
router.post('/country', addCountry);
router.post('/temperature', addTemperature);
router.put('/city/:id', updateCity);
router.delete('/city/:id', deleteCity);
router.get('/cityone/:id', getCityById);
router.get('/city', getAllCities);
router.get('/state', getAllState);
router.get('/country', getAllCountry);

router.post('/addTemp', addTemperature);
router.post('/editTemp/:id', editTemperature);
router.delete('/deleteTemp/:id', deleteTemp);
router.get('/AllTemp', displayWeather);
router.get('/Tempcitywise/:id', displayTempcitywise);
router.get('/Tempdatewise/:date', displayTempdatewise);
router.get('/Tempcitydatewise/:id/:date', displayTempcitydatewise);
router.get('/listDates', listAllDates);

export default router;
