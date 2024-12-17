import React from 'react';

export default function Loader() {

    return (
        <div className='flex justify-center items-center h-screen'>
            <div class="relative w-24 h-24 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent from-75% to-slate-200 to-25% animate-spin"></div>
            <div className='absolute w-20 h-20 rounded-full bg-[var(--primary)]'></div>
        </div>
    );
}