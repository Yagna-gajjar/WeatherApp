import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';

export default function Citydisplay(props) {
    const { List } = props;
    const mode = useSelector((state) => state.mode.value);
    const [currenthour, setCurrenthour] = useState(new Date().getHours());

    useEffect(() => {
        if (mode == "light") {
            document.documentElement.classList.add('light')
        } else {
            document.documentElement.classList.remove('light')
        }
    }, [mode]);

    return (
        <div>
            {
                List.map((data) => {
                    return (
                        <>
                            <Accordion className='bg-primary light:bg-light-primary rounded-2xl my-3 font-rubik capitalize'>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon className='fill-text' />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography className='flex items-center justify-between w-full' component="span">
                                        <div className="flex items-center">
                                            <img className='w-20' src={require('../assests/weather_status_image/' + data.hourly[currenthour].status_image + '.png')} />
                                            <div className='mx-5'>
                                                <p className="text-text font-bold text-2xl">{data.cityID.cityName}</p>
                                                <p className="text-secondary ">{data.cityID.stateID.stateName}, {data.cityID.countryID.countryName}</p>
                                            </div>
                                        </div>
                                        <p className="text-3xl text-text font-bold">{data.hourly[currenthour].temperature}°</p>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <p className="text-secondary text-base flex items-center"><WaterDropIcon className='mx-2' />Humidity: <span className='text-text font-bold px-2'>{data.hourly[currenthour].humidity}</span></p>
                                        <p className="text-secondary text-base flex items-center"><AirIcon className='mx-2' />Wind Speed: <span className='text-text font-bold px-2'>{data.hourly[currenthour].windSpeed}</span></p>
                                    </Typography>
                                </AccordionDetails >
                            </Accordion>
                        </>
                    )
                })
            }
        </div >
    );
}
