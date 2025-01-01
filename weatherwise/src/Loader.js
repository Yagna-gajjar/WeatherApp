import React from 'react';

export default function Loader() {

    return (
        <div className='flex justify-center items-center'>
            <div class="w-24 h-24 flex justify-center items-center  rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent from-75% to-slate-200 to-25% animate-spin">
                <div className='w-20 h-20 rounded-full bg-[var(--primary)]'></div>
            </div>
        </div>
    );
}