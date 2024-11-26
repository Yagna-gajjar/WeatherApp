import React from 'react';
import logo from './assets/images/logo (2).png';
import { Link } from 'react-router-dom';

export default function Herosection() {
  const email = localStorage.getItem("email")
  console.log(email);
  
  return (

    <div className='flex flex-col py-20 items-center h-screen'>
      <img src={logo} className='h-48' />
      <p className='text-5xl py-4 text-amber-700'>WeatherWise</p>
      {
        email ? <Link to={'/index'} className='text-2xl bg-amber-700 bg-opacity-35 text-amber-600 py-2 px-4 rounded-3xl hover:bg-opacity-55 hover:text-amber-400'>Get Started</Link>
          : <>
            <Link to={'/signup'} className='text-2xl bg-amber-700 bg-opacity-35 text-amber-600 py-2 px-4 rounded-3xl hover:bg-opacity-55 hover:text-amber-400'>Sign Up</Link>
            <p className='text-xl text-amber-700'>or</p>
            <Link to={'/signup'} className='text-2xl bg-amber-700 bg-opacity-35 text-amber-600 py-2 px-4 rounded-3xl hover:bg-opacity-55 hover:text-amber-400'>Sign in</Link>
          </>
      }

    </div>
  );
}
