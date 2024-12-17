import City from "../model/cityModel.js";
import Temperature from "../model/temperatureModel.js";

export const addTemperature = async (req, res) => {
    try {
        const { cityID, date, temperature } = req.body;
        const newTemperature = new Temperature({
            cityID, date, temperature
        })
        await newTemperature.save();
        res.status(201).json({ message: 'temperature added successfully' });
    } catch (error) {
        console.error("Error adding temperature", error);
        res.status(500).json({ error: 'Failed to add temperature' })
    }
}

export const editTemperature = async (req, res) => {
    try {
        const { id } = req.params;
        const { cityID, date, temperature } = req.body;

        console.log(temperature);

        const updatedTemp = await Temperature.findByIdAndUpdate(
            id,
            { cityID, date, temperature },
            { new: true }
        );

        if (!updatedTemp) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City updated successfully' });
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({ message: 'Error updating the city' });
    }
}


export const deleteTemp = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTemp = await Temperature.findByIdAndDelete(id);

        if (!deletedTemp) {
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
        const temp = await Temperature.find().populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        })

        res.status(200).json({ message: 'temperatures retrieved successfully', temp });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}

export const displayTempcitywise = async (req, res) => {
    try {
        const { id } = req.params;
        const temp = await Temperature.find({ cityID: { _id: id } }).populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        });
        res.status(200).json({ message: 'temperatures retrieved successfully', temp });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}
export const displayTempdatewise = async (req, res) => {
    try {
        const { id, date } = req.params;
        const temp = await Temperature.find({ date: date }).populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        });
        res.status(200).json({ message: 'temperatures retrieved successfully', temp });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}
export const displayTempcitydatewise = async (req, res) => {
    try {
        const { id, date } = req.params;
        const temp = await Temperature.findOne({ cityID: { _id: id }, date: date }).populate({
            path: 'cityID',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        });
        res.status(200).json({ message: 'temperatures retrieved successfully', temp });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' })
    }
}
export const listAllDates = async (req, res) => {
    try {
        const dates = await Temperature.distinct('date')
        res.status(200).json({ message: 'dates retrieved successfully', dates });
    } catch (error) {
        console.error("Error showing dates", error);
        res.status(500).json({ error: 'Failed to show dates' })
    }
}