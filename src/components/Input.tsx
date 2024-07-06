import clsx from 'clsx';
import React from 'react';

type InputProps = {
    type?: string;
    placeholder?: string;
    id: string;
    icon?: React.ReactNode;
    register?: any;
    className?: string;
};

function Input({ type = "text", placeholder, id, icon, register, className }: InputProps) {
    return (
        <div className={clsx('focus-within:outline h-10 w-[400px] focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse items-center bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden', className)}>
            {icon &&
                <div className='flex items-center px-3 h-[24px] border-l-[1px] border-l-[#D0D5DD]'>
                    {icon}
                </div>}
            <input type={type} id={id} placeholder={placeholder} className='h-full w-full text-primary-900  bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
                {...(register && register(id))} />
        </div>
    );
}

export default Input;
