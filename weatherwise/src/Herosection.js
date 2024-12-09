import React from 'react';
import logo from './assets/images/logo (2).png';
import { Link } from 'react-router-dom';

export default function Herosection() {
  const email = localStorage.getItem("email")
  
  return (

    <div className='flex flex-col py-20 items-center h-screen'>
      <img src={logo} className='h-48' />
      <p className='text-5xl py-4 text-slate-200'>WeatherWise</p>
      {
        email ? <Link to={'/index'} className='text-2xl bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 py-2 px-4 rounded-3xl'>Get Started</Link>
          : <>
            <Link to={'/signup'} className='text-2xl bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 py-2 px-4 rounded-3xl'>Sign Up</Link>
            <p className='text-xl text-slate-200'>or</p>
            <Link to={'/signin'} className='text-2xl  bg-slate-500  text-slate-900 hover:bg-slate-700 hover:text-slate-200 py-2 px-4 rounded-3xl'>Sign in</Link>
          </>
      }

    </div>
  );
}
