import React from 'react';
import clsx from 'clsx';

function Divider({ margin = 4 }) {
    return (
        <div className={clsx(`border-b border-primary-100 mt-${margin} mb-${margin} mb-4`)}>

        </div>
    );
}

export default Divider;
