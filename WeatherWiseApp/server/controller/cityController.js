import City from '../model/cityModel.js';
import Country from '../model/countryModel.js';
import State from '../model/stateModel.js';

export const addCountry = async (req, res) => {
    try {
        const { countryName } = req.body;
        const existingCountry = await Country.findOne({ countryName });
        if (existingCountry) {
            return res.status(400).json({ message: 'Country already exists' });
        }
        const newCountry = new Country({
            countryName
        })
        await newCountry.save();
        res.status(201).json({ message: 'Country added successfully' });
    } catch (error) {
        console.error("Error adding Country", error);
        res.status(500).json({ error: 'Failed to add Country' })

    }
}

export const addState = async (req, res) => {
    try {
        const { stateName, countryID } = req.body;
        const existingState = await State.findOne({ stateName, countryID });
        if (existingState) {
            return res.status(400).json({ message: 'State already exists' });
        }
        const newState = new State({
            stateName,
            countryID
        })
        await newState.save();
        res.status(201).json({ message: 'State added successfully' });
    } catch (error) {
        console.error("Error adding State", error);
        res.status(500).json({ error: 'Failed to add State' })

    }
}

export const addCity = async (req, res) => {
    try {
        const { cityName, stateID, countryID, } = req.body;

        const existingCity = await City.findOne({ cityName, stateID, countryID });
        if (existingCity) {
            return res.status(400).json({ message: 'City already exists' });
        }

        const newCity = new City({
            cityName,
            stateID,
            countryID
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
export const getAllState = async (req, res) => {
    try {
        const states = await State.find()
            .populate('countryID', 'countryName')

        res.status(200).json({ message: 'Cities retrieved successfully', states });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};
export const getAllCountry = async (req, res) => {
    try {
        const countries = await Country.find()

        res.status(200).json({ message: 'Cities retrieved successfully', countries });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};