import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';

const WeatherTable = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [sortBy, setSortBy] = useState({ field: "date", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        cityID: "",
        date: "",
        temperature: [
            { time: "", temperature: "", range: "" }
        ],
    });

    const [currentTimeRange, setCurrentTimeRange] = useState("00:00-06:00");

    useEffect(() => {
        setLoading(true);
        fetchDropdownData();
        fetchWeatherData();
        setLoading(false);
    }, []);

    const fetchWeatherData = async () => {
        const response = await axios.get("http://localhost:5000/api/AllWeather");
        const enrichedData = response.data.temp

        setWeatherData([...enrichedData]);
        setFilteredCities([...enrichedData]);
    };
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = weatherData.filter(city =>
            city.cityID.cityName.toLowerCase().includes(query) ||
            city.cityID.stateID.stateName.toLowerCase().includes(query) ||
            city.cityID.countryID.countryName.toLowerCase().includes(query)
        );
        setFilteredCities(filtered);
    };
    const fetchDropdownData = async () => {
        const cities = await axios.get("http://localhost:5000/api/city");
        setCityList(cities.data.cities);
    };

    const timeRanges = [
        { label: "00:00-06:00", start: "00:00", end: "06:00" },
        { label: "06:00-12:00", start: "06:00", end: "12:00" },
        { label: "12:00-18:00", start: "12:00", end: "18:00" },
        { label: "18:00-24:00", start: "18:00", end: "23:59" },
    ];
    const [startineindex, seStartineindex] = useState(0);
    const handleTimeSlotChange = (direction) => {

        if (direction == 1) {
            if (currentTimeRange === "18:00-24:00") {
                seStartineindex(0)
            } else {
                seStartineindex(startineindex + 6);
            }
        } else if (direction == -1) {
            if (currentTimeRange === "00:00-06:00") {
                seStartineindex(18)
            } else {
                seStartineindex(startineindex - 6);
            }
        }
        const currentIndex = timeRanges.findIndex((range) => range.label === currentTimeRange);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = timeRanges.length - 1;
        if (newIndex >= timeRanges.length) newIndex = 0;

        setCurrentTimeRange(timeRanges[newIndex].label);
    };

    const filterDataByTimeRange = (data) => {
        const range = timeRanges.find((r) => r.label === currentTimeRange);
        return data.temperature.filter(
            (temp) => temp.time >= range.start && temp.time < range.end
        );
    };
    const timeSlots = Array.from(
        { length: 6 },
        (_, index) => {
            const startHour = index + startineindex;
            const endHour = index + startineindex + 1;

            return `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`;
        }
    );

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/deleteTemp/${id}`);
        fetchWeatherData();
    };

    const handleAddEdit = async (e, id) => {
        e.preventDefault();

        const url = formData.id
            ? `http://localhost:5000/api/editTemp/${formData.id}`
            : "http://localhost:5000/api/addTemp";


        await axios.post(url, formData);

        setFormData({
            id: "",
            cityID: "",
            date: "",
            temperature: [
                { time: "", temperature: "", range: "" }
            ],
        })
        fetchWeatherData();
    };

    const addTemperatureRow = () => {
        setFormData({
            ...formData,
            temperature: [...formData.temperature, { time: "", temperature: "", range: "" }],
        });
    };

    const removeTemperatureRow = (index) => {
        setFormData(data => ({
            ...data,
            temperature: data.temperature.filter((_, i) => i != index),
        }));
    }
    const [range, setRange] = useState('00:00-01:00');
    const handleTemperatureChange = (index, field, value) => {
        if (field == 'time') {
            setRange(value.split(":")[0] + ":00 - " + (parseInt(value.split(":")[0]) + 1).toString().padStart(2, '0') + ":00")
        }
        const updatedTemperature = formData.temperature.map((entry, i) =>
            i === index
                ? { ...entry, [field]: value, range: range }
                : entry
        );
        setFormData({ ...formData, temperature: updatedTemperature });
    };

    return (
        loading ? (<Loader />) : (<div className="p-6 bg-slate-400 bg-opacity-25 m-16 rounded-md">
            <h1 className="text-3xl font-bold text-slate-300 mb-4">Weather Details</h1>
            <form onSubmit={handleAddEdit} className="mb-6 grid gap-4">
                <div className="grid grid-cols-5 gap-4">
                    <select
                        value={formData.cityID}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFormData({ ...formData, cityID: selectedValue });
                        }}
                        className="outline-none rounded p-2 bg-slate-400 opacity-75"
                    >
                        <option className="text-slate-900" value="">Select City</option>
                        {cityList.map((city) => (
                            <option
                                key={city._id}
                                value={city._id}

                            >
                                {`${city.cityName}, ${city.stateID.stateName}, ${city.countryID.countryName}`}
                            </option>
                        ))}
                    </select>


                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="outline-none bg-slate-400 bg-opacity-75 rounded p-2"
                    />
                </div>
                <div className="space-y-2">
                    {formData.temperature.map((entry, index) => (
                        <div key={index} className="flex space-x-4">
                            <input
                                type="time"
                                value={entry.time}
                                onChange={(e) => handleTemperatureChange(index, "time", e.target.value)}
                                className="outline-none bg-slate-400 bg-opacity-75 rounded p-2 flex-1"
                                min="00:00"
                                max="23:00"
                            />
                            <input
                                type="number"
                                value={entry.temperature}
                                onChange={(e) => handleTemperatureChange(index, "temperature", e.target.value)}
                                className="outline-none bg-slate-400 bg-opacity-75 rounded p-2 flex-1"
                                placeholder="Temperature"
                            />
                            {
                                index >= 0 ? (<p className="flex justify-center items-center" onClick={() => { removeTemperatureRow(index) }}><ClearIcon /></p>) : (<p className="flex justify-center items-center"></p>)
                            }
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTemperatureRow}
                        className="text-slate-200 underline"
                    >
                        Add Another Time Slot
                    </button>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-slate-900 text-slate-300 rounded p-2"
                >
                    {formData.id ? "Edit" : "Add"} Weather
                </button>
            </form>

            <div className="flex justify-between mb-4 items-center">
                <button
                    onClick={() => handleTimeSlotChange(-1)}
                    className="bg-blue-400 text-white px-3 py-2 rounded"
                >
                    &lt;
                </button>
                <span className="text-lg font-medium">{currentTimeRange}</span>
                <button
                    onClick={() => handleTimeSlotChange(1)}
                    className="bg-blue-400 text-white px-3 py-2 rounded"
                >
                    &gt;
                </button>
            </div>
            <input type="text" onChange={handleSearchChange} placeholder="search city" className="border mb-4 w-full placeholder-slate-400 border-slate-800 rounded-2xl outline-none text-slate-800 px-5 py-1" />
            <div className="overflow-y-scroll max-h-96 border border-slate-300 rounded-md">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 border border-slate-300">City</th>
                            <th className="p-2 border border-slate-300">State</th>
                            <th className="p-2 border border-slate-300">Country</th>
                            <th className="p-2 border border-slate-300">Date</th>
                            {timeSlots.map((time) => (
                                <th key={time} className="p-2 border border-slate-300">
                                    {time}
                                </th>
                            ))}
                            <th className="p-2 border border-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCities.map((data) => (
                            <tr key={data.id}>
                                <td className="p-2 border border-slate-300">{data.cityID.cityName}</td>
                                <td className="p-2 border border-slate-300">{data.cityID.stateID.stateName}</td>
                                <td className="p-2 border border-slate-300">{data.cityID.countryID.countryName}</td>
                                <td className="p-2 border border-slate-300">
                                    {data.date.split("T")[0]}
                                </td>
                                {timeSlots.map((timeSlot) => {
                                    const filteredTemps = filterDataByTimeRange(data);
                                    const tempEntry = filteredTemps.find(
                                        (temp) => temp.range === timeSlot
                                    );
                                    return (
                                        <td
                                            key={timeSlot}
                                            className={`p-2 border border-slate-300 text-center ${tempEntry ? "" : "text-slate-500"
                                                }`}
                                        >
                                            {tempEntry ? `${tempEntry.temperature}°C` : "-"}
                                        </td>
                                    );
                                })}
                                <td className="p-2 border border-slate-300">
                                    <button
                                        className="text-blue-400"
                                        onClick={() => {
                                            setFormData({
                                                id: data._id,
                                                cityID: data.cityID._id,
                                                date: data.date.split("T")[0],
                                                temperature: data.temperature,
                                            });
                                        }}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        className="text-red-600"
                                        onClick={() => handleDelete(data._id)}
                                    >
                                        <DeleteForeverIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)

    );
};

export default WeatherTable;


