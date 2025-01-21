import React from 'react';

export default function Button(props) {
    const { value, fun } = props;
    return (
        // <button
        //     onClick={() => {
        //         fun && fun()
        //     }}
        //     className="
        //     relative outline-none rounded-full bg-secondary text-background 
        //     px-4 py-1 transition-all duration-500 
        //     overflow-hidden
        //     border-2 border-border
        //     hover:scale-105
        //     before:content-[''] before:w-full before:h-full before:bg-background
        //     before:opacity-25 before:-skew-x-12 
        //     before:absolute before:top-0 before:-left-24 
        //     before:transition-all before:duration-1000 hover:before:left-0
        //     ">
        //     {value}
        // </button>

        <button
            onClick={() => {
                fun && fun()
            }}
            className="
            outline-none rounded-full bg-secondary text-background 
            px-4 py-1 transition-all duration-500 
            overflow-hidden
            border-2 border-border
            hover:scale-105
            hover:opacity-60
            ">
            {value}
        </button>
    );
}
