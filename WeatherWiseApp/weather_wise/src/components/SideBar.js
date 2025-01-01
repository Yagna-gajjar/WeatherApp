import React, { useState, useEffect } from 'react';
import Logo from '../assests/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function SideBar() {
    const [selectedNav, setSelectedNav] = useState("Weather");
    const navigate = useNavigate();
    const mode = useSelector((state) => state.mode.value);
    const [sidebarNav, setSidebarNav] = useState(
        [
            {
                svg: (<svg viewBox="0 0 576 512" className='w-4 h-4 min-[1130px]:w-5 min-[1130px]:h-5'><path d="M510.5 225.5c-6.9-37.2-39.3-65.5-78.5-65.5-12.3 0-23.9 3-34.3 8-17.4-24.1-45.6-40-77.7-40-53 0-96 43-96 96 0 .5.2 1.1.2 1.6C187.6 233 160 265.2 160 304c0 44.2 35.8 80 80 80h256c44.2 0 80-35.8 80-80 0-39.2-28.2-71.7-65.5-78.5zm-386.4 34.4c-37.4-37.4-37.4-98.3 0-135.8 34.6-34.6 89.1-36.8 126.7-7.4 20-12.9 43.6-20.7 69.2-20.7.7 0 1.3.2 2 .2l8.9-26.7c3.4-10.2-6.3-19.8-16.5-16.4l-75.3 25.1-35.5-71c-4.8-9.6-18.5-9.6-23.3 0l-35.5 71-75.3-25.1c-10.2-3.4-19.8 6.3-16.4 16.5l25.1 75.3-71 35.5c-9.6 4.8-9.6 18.5 0 23.3l71 35.5-25.1 75.3c-3.4 10.2 6.3 19.8 16.5 16.5l59.2-19.7c-.2-2.4-.7-4.7-.7-7.2 0-12.5 2.3-24.5 6.2-35.9-3.6-2.7-7.1-5.2-10.2-8.3zm69.8-58c4.3-24.5 15.8-46.4 31.9-64-9.8-6.2-21.4-9.9-33.8-9.9-35.3 0-64 28.7-64 64 0 18.7 8.2 35.4 21.1 47.1 11.3-15.9 26.6-28.9 44.8-37.2zm330.6 216.2c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8zm-96 0c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8zm-96 0c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8zm-96 0c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8z"></path></svg>),
                name: 'Weather',
                nav: '/'
            },
            {
                svg: (<svg viewBox="0 0 512 512" className='w-3 h-3 min-[1130px]:w-4 min-[1130px]:h-4'><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>),
                name: 'Cities',
                nav: '/cityList'
            },
            {
                svg: (<svg viewBox="0 0 576 512" className='w-3 h-3 min-[1130px]:w-4 min-[1130px]:h-4'><path d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0 - 11.32 - 11.43 - 19.06 - 21.94 - 14.86z"></path></svg>),
                name: 'Map',
                nav: '/Map'
            }
        ]
    )

    const handlenavigation = ((path) => {
        navigate(path)
    })

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        screenSize.width >= 500 ?
            (<div className="bg-primary w-fit rounded-2xl h-[99%] px-3 pt-2 min-[1130px]:px-4 min-[1130px]:pt-3 font-rubik">
                <div className='w-12 min-[1130px]:w-14 pb-12'>
                    <img src={Logo} />
                </div>
                <div className='flex flex-col items-center'>
                    {
                        sidebarNav.map((data, index) => {
                            return (
                                <div className='flex flex-col items-center py-2' onClick={() => {
                                    setSelectedNav(data.name)
                                    handlenavigation(data.nav)
                                }}>
                                    <div className={`${selectedNav == data.name ? 'fill-text ' : 'fill-secondary'}`}>
                                        {data.svg}
                                    </div>
                                    <p className={`${selectedNav == data.name ? 'text-text font-bold' : 'text-secondary'} text-xs font-rubik  py-2`}>{data.name}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div >) : (
                <div className='z-20'>
                    <div class="relative group">
                        <button
                            onClick={toggleDropdown}
                            className="py-2 text-text focus:outline-none"
                        >
                            {isOpen ? (<div className='fill-text'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="24"
                                    height="24" viewBox="0 0 50 50">
                                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                </svg>
                            </div>) : (<div className="fill-text">
                                <svg id='button'
                                    width="24"
                                    height="24"
                                >
                                    <path
                                        d="M5 6h14M5 12h14M5 18h14"
                                        className="stroke-text"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                            </div>)}
                        </button>
                        <div
                            className={`absolute z-10 left-0 mt-2 w-48 bg-secondary border border-secondary rounded-md shadow-lg transition-all duration-300 transform ${isOpen
                                ? "opacity-100 visible scale-100"
                                : "opacity-0 invisible scale-95"
                                }`}
                        >
                            {
                                sidebarNav.map((nav) => {
                                    return (
                                        <Link to={nav.nav} class="block px-4 py-2 text-primary" > {nav.name}</Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div >)
    );
}
