import City from "../model/cityModel.js";
import Weather from "../model/weatherModel.js";

export const addWeather = async (req, res) => {
    try {
        const weatherData = req.body;
        const newWeather = new Weather(weatherData)
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
        const { field, value, weatherindex } = req.body;
        console.log(field, value, weatherindex);

        const WeatherPerticular = await Weather.updateOne(
            { _id: id },
            { $set: { [`hourly.${weatherindex}.${field}`]: value } }
        );
        if (!WeatherPerticular) {
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
        const weather = await Weather.find({ date: date })
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
export const displayWeatherdatestatewise = async (req, res) => {
    try {
        const { cityID, date } = req.params;
        const citydata = await City.findOne({ _id: cityID })
        const stateId = citydata.stateID
        const weather = await Weather.find({ date: date })
            .populate({
                path: 'cityID',
                match: { stateID: { _id: stateId } },
                populate: [
                    { path: 'stateID', model: 'State', select: 'stateName' },
                    { path: 'countryID', model: 'Country', select: 'countryName' }
                ]
            });

        const filteredWeather = weather.filter(item => item.cityID !== null);

        res.status(200).json({
            message: 'Temperatures retrieved successfully',
            weather: filteredWeather
        });
    } catch (error) {
        console.error("Error showing temperature", error);
        res.status(500).json({ error: 'Failed to show temperature' });
    }

}
export const displayWeathercitydatewise = async (req, res) => {
    try {
        const { id, date } = req.params;
        const weather = await Weather.findOne({ cityID: { _id: id }, date: date }).populate({
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
function getCurrentWeekRange() {
    const currentDate = new Date();
    const firstDay = new Date(currentDate);
    const lastDay = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    firstDay.setDate(currentDate.getDate() - dayOfWeek);
    lastDay.setDate(currentDate.getDate() + (6 - dayOfWeek));
    const formatDate = (date) => date.toISOString().split('T')[0];
    return {
        startOfWeek: formatDate(firstDay),
        endOfWeek: formatDate(lastDay),
    };
}
export const displaysevendaysWeather = async (req, res) => {
    try {
        // const { startOfWeek, endOfWeek } = getCurrentWeekRange();
        const startOfWeek = '2024-12-18'
        const endOfWeek = '2024-12-24   '
        const { id } = req.params;
        const { timenow, today } = req.body;
        const days = [
            "sun", "mon", "tue", "wed", "thu", "fri", "sat"
        ]
        const weather = await Weather.find({
            cityID: { _id: id },
            date: { $gte: startOfWeek, $lte: endOfWeek }
        })
        const sevenday = [];
        weather.map((data, index) => {
            let max_temp = data.hourly[0].temperature;
            let min_temp = data.hourly[0].temperature;
            data.hourly.map((d) => {
                if (d.temperature > max_temp) {
                    max_temp = d.temperature
                }
                if (d.temperature < min_temp) {
                    min_temp = d.temperature
                }
            })
            sevenday.push({ "day": days[today] == days[index] ? "today" : days[index], "status": data.hourly[timenow].status, "status_image": data.hourly[timenow].status_image, "max_temp": Math.round(max_temp), "min_temp": Math.round(min_temp) })
        })
        res.status(200).json({ message: 'weather retrieved successfully', sevenday });
    } catch (error) {
        console.error("Error showing weather", error);
        res.status(500).json({ error: 'Failed to show weather' })
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