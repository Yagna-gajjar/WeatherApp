import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

export default function PerticularCityManage() {
    const api = useSelector((state) => state.api.url);
    const { cityName, cityId } = useParams();
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [weatherData, setWeatherData] = useState({
        cityID: cityId,
        date: date,
        hourly: []
    });
    const [activeButton, setActiveButton] = useState("Today");
    const [editing, setEditing] = useState(null);
    const nav = useNavigate();
    const [updatingField, setUpdatingField] = useState('');
    const [updatingValue, setUpdatingValue] = useState('');
    const [updatingIndex, setUpdatingIndex] = useState(-1);
    const [statusOptions] = useState(['Clear', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy']);

    const generateTimings = () => {
        const timings = [];
        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, "0");
            const nextHour = i !== 23 ? (i + 1).toString().padStart(2, "0") : '00';
            timings.push(`${hour}:00-${nextHour}:00`);
        }
        return timings;
    };

    const [id, setID] = useState(null);

    const fetchOneCity = async (selectedDate) => {
        try {
            const res = await axios.get(`${api}/api/Weathercitydatewise/${cityId}/${selectedDate}`);
            setWeatherData(res.data.weather || {
                cityID: cityId,
                date: selectedDate,
                hourly: []
            });

            setWeatherData((prevState) => {
                let updatedHourly = prevState.hourly;
                if (prevState.hourly.length === 0) {
                    const timing = generateTimings();
                    updatedHourly = timing.map((data) => ({
                        time: data.split("-")[0],
                        range: data,
                        temperature: "",
                        humidity: "",
                        windSpeed: "",
                        status: "",
                        status_image: ""
                    }));
                }
                return {
                    ...prevState,
                    hourly: updatedHourly
                };
            });
            setID(res.data.weather._id || null);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData((prevState) => {
                let updatedHourly = prevState.hourly;
                if (prevState.hourly.length === 0) {
                    const timing = generateTimings();
                    updatedHourly = timing.map((data) => ({
                        time: data.split("-")[0],
                        range: data,
                        temperature: "",
                        humidity: "",
                        windSpeed: "",
                        status: "",
                        status_image: ""
                    }));
                }
                return {
                    ...prevState,
                    hourly: updatedHourly
                };
            });
        }
    };

    useEffect(() => {
        fetchOneCity(date);
    }, [date]);

    const handleDateChange = (buttonType) => {
        let selectedDate = new Date();
        if (buttonType === "Tomorrow") {
            selectedDate.setDate(selectedDate.getDate() + 1);
        } else if (buttonType === "Choose Date") {
            return;
        }

        setDate(selectedDate.toISOString().split("T")[0]);
        setActiveButton(buttonType);
    };

    const handleCustomDateChange = (event) => {
        setDate(event.target.value);
        setActiveButton("Choose Date");
    };

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };
    const addOrEditWeather = useCallback(
        debounce(async () => {
            try {
                if (id) {
                    await axios.put(`${api}/api/editWeather/${id}`, { field: updatingField, value: updatingValue, weatherindex: updatingIndex });
                } else {
                    await axios.post(`${api}/api/addWeather`, weatherData);
                }
            } catch (error) {
                console.error("Error saving weather data:", error);
            }
        }, 300),
        [api, date, weatherData]
    );
    const handleCellDoubleClick = (e, time, field) => {
        setEditing({ time, field });
    };
    const handleCellBlur = (event, time, field, index) => {
        const value = event.target.innerText.trim();
        setEditing(null);
        if (value && weatherData && field != 'status') {
            const updatedHourly = [...weatherData.hourly];
            const indexToUpdate = updatedHourly.findIndex(hour => hour.range === time);
            if (indexToUpdate !== -1) {
                updatedHourly[indexToUpdate] = {
                    ...updatedHourly[indexToUpdate],
                    [field]: value,
                };
            }
            setUpdatingField(field);
            setUpdatingValue(value);
            setUpdatingIndex(index);
            setWeatherData({ ...weatherData, hourly: updatedHourly })
            addOrEditWeather()
        }
    };


    const handleStatusChange = (e, time, index) => {
        setWeatherData({
            ...weatherData,
            hourly: weatherData.hourly.map(hour =>
                hour.range === time ? { ...hour, status: e.target.value } : hour
            )
        });
        setUpdatingField('status');
        setUpdatingValue(e.target.value);
        setUpdatingIndex(index);
        addOrEditWeather();
    };

    const timings = generateTimings();
    return (
        <div className='flex flex-col justify-center items-center h-screen overflow-hidden'>
            <div className='flex flex-col items-start w-[90%] lg:w-[65%]'>
                <div onClick={() => {
                    nav('/admin')
                }} className='flex justify-between transition-all duration-300 ease-in-out hover:gap-2 text-secondary py-2 hover:cursor-pointer'>
                    <p className=''>
                        <ArrowBackIosNewIcon />
                    </p>
                    <p id='backbtn' className='text-base transition-all duration-700'>
                        Back
                    </p>
                </div>
                <p className='text-text font-bold text-3xl py-2 md:py-5'>{cityName}</p>
                <div className='flex gap-x-3 py-3'>
                    <button
                        className={`px-3 md:px-4 md:py-2 rounded-xl lg:rounded-full text-xs md:text-base ${activeButton === "Today" ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}
                        onClick={() => handleDateChange("Today")}
                    >
                        Today
                    </button>
                    <button
                        className={`px-3 md:px-4 md:py-2 rounded-xl lg:rounded-full text-xs md:text-base ${activeButton === "Tomorrow" ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}
                        onClick={() => handleDateChange("Tomorrow")}
                    >
                        Tomorrow
                    </button>
                    <input
                        type="date"
                        className={`px-3 md:px-4 md:py-2 rounded-xl lg:rounded-full text-xs md:text-base  ${activeButton === "Choose Date" ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}
                        value={date}
                        onChange={handleCustomDateChange}
                    />
                </div>
            </div>
            <div className='overflow-y-scroll w-[100%] lg:w-[70%] py-3'>
                <TableContainer component={Paper} className='bg-transparent lg:px-5'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    ['Time', 'Temperature', 'Humidity', 'Wind Speed', 'Status'].map((fieldname, i) => {
                                        return (

                                            <TableCell className='text-text text-xs md:text-base selection:bg-primary' align="center">{fieldname}&nbsp;{i != 1 ? '' : '(c)'}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                timings.map((time, index) => {
                                    const dataForTime = weatherData.hourly?.find((data) => data.range === time) || {};
                                    return (
                                        <TableRow
                                            key={time}
                                            className='text-text'
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell className='text-text text-xs md:text-base selection:bg-primary p-0' align='center' component="th" scope="row">{time}</TableCell>
                                            {
                                                ['temperature', 'humidity', 'windSpeed'].map((field) => {
                                                    return (
                                                        <TableCell
                                                            key={field}
                                                            className='text-text text-xs md:text-base hover:cursor-pointer hover:bg-primary hover:selection:bg-secondary selection:bg-primary'
                                                            align="center"
                                                            contentEditable={editing?.time === time && editing?.field === field}
                                                            suppressContentEditableWarning={true}
                                                            onDoubleClick={(e) => handleCellDoubleClick(e, time, field)}
                                                            onBlur={(e) => handleCellBlur(e, time, field, index)}
                                                        >
                                                            {dataForTime[field] || '--'}
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                            <TableCell
                                                className="text-text text-xs md:text-base hover:cursor-pointer hover:bg-primary hover:selection:bg-secondary selection:bg-primary"
                                                align="center"
                                                onDoubleClick={(e) => handleCellDoubleClick(e, time, 'status')}
                                            >
                                                {editing?.time === time && editing?.field === 'status' ? (
                                                    <select
                                                        className="border p-1 bg-transparent"
                                                        value={dataForTime.status || 'Clear'}
                                                        onBlur={(e) => handleCellBlur(e, time, 'status')}
                                                        onChange={(e) => handleStatusChange(e, time, index)}
                                                    >
                                                        <option value="Clear" disabled selected className='bg-primary'>select status</option>
                                                        <option value="Clear" className='bg-primary'>Clear</option>
                                                        <option value="Cloudy" className='bg-primary'>Cloudy</option>
                                                        <option value="Rainy" className='bg-primary'>Rainy</option>
                                                        <option value="Stormy" className='bg-primary'>Stormy</option>
                                                        <option value="Windy" className='bg-primary'>Windy</option>
                                                    </select>
                                                ) : (
                                                    dataForTime.status || 'select status'
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
