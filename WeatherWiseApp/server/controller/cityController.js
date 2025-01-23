import City from '../model/cityModel.js';
import Country from '../model/countryModel.js';
import State from '../model/stateModel.js';

export const getCityById = async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findOne({ _id: id }).populate('stateID', 'stateName').populate('countryID', 'countryName');

        res.status(200).json({ message: 'Cities retrieved successfully', city });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};
export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('stateID', 'stateName')
            .populate('countryID', 'countryName')

        res.status(200).json({ message: 'Cities retrieved successfully', cities });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};
