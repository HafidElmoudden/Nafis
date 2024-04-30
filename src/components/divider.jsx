import React from 'react';
import clsx from 'clsx';

function Divider({ margin = 4 }) {
    //                     <div className="w-full h-[0.5px] bg-gray-100 mt-[10px] mb-[10px]"></div>
    // <div className={clsx(`border-b border-primary-100 mt-${margin} mb-${margin} mb-4`)}>
    return (
        <div className={clsx(`w-full h-[0.5px] bg-gray-200 mt-${margin} mb-${margin}`)}></div>
    );
}

export default Divider;
