import { UserIcon } from 'lucide-react'
import React from 'react'

function InputSection({ label, type, id, icon, register }) {
    return (
        <div className='flex items-end justify-between w-full flex-col'>
            <label className='block text-sm font-semibold text-black w-fit' htmlFor={id}>{label}</label>
            <div className='focus-within:outline mt-4 h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-3'>
                        {icon}
                    </div>}
                <input type={type} id={id} className='h-full w-full text-primary-900  bg-transparent py-12px px-16px border-none outline-none box-border font-semibold' />
            </div>
        </div>
    )
}

export default InputSection