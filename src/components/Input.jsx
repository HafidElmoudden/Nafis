import React from 'react';

function Input({ type, placeholder, id, icon, register }) {
    return (
        <div className='flex w-full flex-row-reverse'>
            <div className='focus-within:outline h-10 w-[400px] focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-3'>
                        {icon}
                    </div>}
                <input type={type} id={id} placeholder={placeholder} className='h-full w-full text-primary-900  bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
                    {...(register && register(id))} />
            </div>
        </div>
    );
}

export default Input;
