import React from 'react';
import BallTriangle from "react-spinners/BallTriangle";
import './Loader.css';

export default function Loader() {

    return (
        <div className='flex justify-center items-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}