import City from "../model/cityModel.js";
import Weather from "../model/weatherModel.js";

export const addWeather = async (req, res) => {
    try {
        const { cityID, weatherData } = req.body;
        const newWeather = new Weather({
            cityID, weatherData
        })
        await newWeather.save();
        res.status(201).json({ message: 'weather added successfully' });
    } catch (error) {
        console.error("Error adding weather", error);
        res.status(500).json({ error: 'Failed to add weather' })
    }
}

export const editWeather = async (req, res) => {
    try {
        const { id } = req.params;
        const { cityID, weatherData } = req.body;

        const updatedWeather = await Weather.findByIdAndUpdate(
            id,
            { cityID, weatherData },
            { new: true }
        );

        if (!updatedWeather) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City updated successfully' });
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({ message: 'Error updating the city' });
    }
}


export const deleteweather = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedWeather = await Weather.findByIdAndDelete(id);

        if (!deletedWeather) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        console.error("Error deleting city:", error);
        res.status(500).json({ message: 'Error deleting the city' });
    }
};


export const displayWeather = async (req, res) => {
    try {
        const weather = await Weather.find().populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        })

        res.status(200).json({ message: 'temperatures retrieved successfully', weather });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}

export const displayWeathercitywise = async (req, res) => {
    try {
        const { id } = req.params;
        const weather = await Weather.find({ cityID: { _id: id } }).populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        });
        res.status(200).json({ message: 'temperatures retrieved successfully', weather });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}
export const displayWeatherdatewise = async (req, res) => {
    try {
        const { date } = req.params;
        const targetDate = new Date(date);

        const weather = await Weather.find({ date: targetDate })
            .populate({
                path: 'cityID',
                populate: [
                    { path: 'stateID', model: 'State', select: 'stateName' },
                    { path: 'countryID', model: 'Country', select: 'countryName' }
                ]
            });
        res.status(200).json({ message: 'weather retrieved successfully', weather });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show weather' })
    }
}
export const displayWeathercitydatewise = async (req, res) => {
    try {
        const { id, date } = req.params;
        const targetDate = new Date(date);
        const weather = await Weather.findOne({ cityID: { _id: id }, date: targetDate }).populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        });
        res.status(200).json({ message: 'temperatures retrieved successfully', weather });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}
export const listAllDates = async (req, res) => {
    try {
        const dates = await Weather.distinct('date')
        res.status(200).json({ message: 'dates retrieved successfully', dates });
    } catch (error) {
        console.error("Error showing dates", error);
        res.status(500).json({ error: 'Failed to show dates' })
    }
}