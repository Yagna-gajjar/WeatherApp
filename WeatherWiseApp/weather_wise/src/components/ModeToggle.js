import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../Store";
export default function ModeToggle() {
    const mode = useSelector((state) => state.mode.value);
    const dispatch = useDispatch();
    useEffect(() => {
        document.body.classList = mode;
    }, [mode]);

    return (
        <div className='flex'>
            <div onClick={() => {
                dispatch(toggleMode())
            }} className='w-20 h-10 flex justify-between border-2 border-primary rounded-full ms-3 font-rubik'>
                {
                    mode == "dark" ? (
                        <>
                            <img className='p-1 bg-secondary rounded-full m-1' src={require('../assests/darkmode.png')} />
                            <p className='text-secondary text-xs flex items-center justify-end pe-2'>Dark</p>
                        </>
                    ) : (
                        <>
                            <p className='text-secondary text-xs flex items-center justify-end ps-2'>Light</p>
                            <img className='p-1 bg-orange-200 rounded-full m-1' src={require('../assests/lightMode.webp')} />
                        </>
                    )
                }
            </div>
        </div>
    );
}
