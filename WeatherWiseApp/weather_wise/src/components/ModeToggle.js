import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../Store";
import { toggleMode } from "../Store"
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

export default function ModeToggle() {
    const mode = useSelector((state) => state.mode.value);
    const [ismodeopen, setIsmodeopen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList = 'cloudy';
    }, [mode]);

    const openandclose = () => {
        const night = document.getElementById('night')
        const sunny = document.getElementById('sunny')
        const cloudy = document.getElementById('cloudy')
        if (ismodeopen) {
            setIsmodeopen(false)
            night.classList = 'flex justify-center opacity-0 -translate-x-8'
            sunny.classList = 'flex justify-center opacity-0 -translate-x-12'
            cloudy.classList = 'flex justify-center opacity-0 -translate-x-16'

        } else {
            setIsmodeopen(true)
            night.classList = 'flex justify-center translate-x-4'
            sunny.classList = 'flex justify-center translate-x-4'
            cloudy.classList = 'flex justify-center translate-x-4'
        }
    }

    return (
        <div className='flex items-center justify-center z-10'>
            <div className=' z-10' onClick={(e) => {
                openandclose()
                const target = e.target;
                if (!target.classList.contains("modebutton")) {
                    void target.offsetWidth;
                    target.classList.add("modebutton");
                    setTimeout(() => target.classList.remove("modebutton"), 1000);
                    console.log("first");
                }
            }}>
                <ModeStandbyIcon className='fill-secondary  rounded-full w-7 h-7' id="modebutton" />
            </div>
            <ol className='w-28 h-7 flex justify-between'>
                <li id='night' onClick={() => {
                    dispatch(changeMode('night'))
                    openandclose()
                }} className='flex justify-center opacity-0 -translate-x-8'>
                    <img className='w-7 bg-[#9399a2] p-1 rounded-full' src={require('../assests/nightMode.png')} />
                </li>
                <li id='sunny' onClick={() => {
                    dispatch(changeMode('sunny'))
                    openandclose()
                }} className='flex justify-center  opacity-0 -translate-x-12'>
                    <img className='w-7 bg-[#fed7aa] p-1 rounded-full' src={require('../assests/sunnyMode.webp')} />
                </li>
                <li id='cloudy' onClick={() => {
                    dispatch(changeMode('cloudy'))
                    openandclose()
                }} className='flex justify-center  opacity-0 -translate-x-16'>
                    <img className='w-7 bg-[#7090c3] p-1 rounded-full' src={require('../assests/cloudyMode.png')} />
                </li>
            </ol>
        </div>
    );
}
