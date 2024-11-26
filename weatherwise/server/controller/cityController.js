import City from '../model/cityModel.js';

export const addCity = async (req, res) => {
    try {
        const { cityName, state, country, temperature } = req.body;

        const existingCity = await City.findOne({ cityName, state, country, temperature });
        if (existingCity) {
            return res.status(400).json({ message: 'City already exists' });
        }

        const newCity = new City({
            cityName,
            state,
            country,
            temperature
        });

        await newCity.save();
        res.status(201).json({ message: 'City added successfully' });
    } catch (error) {
        console.error("Error adding city:", error);
        res.status(500).json({ error: 'Failed to add city' });
    }
};

export const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { cityName, state, country, temperature } = req.body;

        const updatedCity = await City.findByIdAndUpdate(
            id,
            { cityName, state, country, temperature },
            { new: true }
        );

        if (!updatedCity) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City updated successfully' });
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({ message: 'Error updating the city' });
    }
};

export const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCity = await City.findByIdAndDelete(id);

        if (!deletedCity) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        console.error("Error deleting city:", error);
        res.status(500).json({ message: 'Error deleting the city' });
    }
};

export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find();

        res.status(200).json({ message: 'Cities retrieved successfully', cities });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};

export const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const city = await City.findOne({ _id: id });

        res.status(200).json({ message: 'Cities retrieved successfully', city });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};
