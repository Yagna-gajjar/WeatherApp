import express from 'express';
import { signup, signin, upload } from './controller/authController.js';
import { addCity, deleteCity, getAllCities, getCityById, updateCity } from './controller/cityController.js';
import { editUser, getUserByEmail } from './controller/userController.js';

const router = express.Router();

router.post('/signup', upload.single('file'), signup);
router.post('/signin', signin);
router.put('/editprofile/:findemail', upload.single('file'), editUser);
router.get('/oneuser/:findemail', getUserByEmail);

router.post('/city', addCity);
router.put('/city/:id', updateCity);
router.delete('/city/:id', deleteCity);
router.get('/city', getAllCities);
router.get('/cityone/:id', getCityById);

export default router;
