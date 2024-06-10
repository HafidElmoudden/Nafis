import { ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react'
import { cn } from 'utils';
import { Switch as SwitchComponent } from "@/components/ui/switch"

const frameworks = [
    {
        value: "third_class_1",
        label: "1 - الصف الثالث",
    },
    {
        value: "third_class_2",
        label: "2 - الصف الثالث",
    },
    {
        value: "third_class_3",
        label: "3 - الصف الثالث",
    },
    {
        value: "sixth_class_1",
        label: "1 - الصف السادس",
    },
    {
        value: "third_mid_class_1",
        label: "1 - الصف الثالث المتوسط",
    },
]

function Input({ type, placeholder, id, icon, register }) {
    return (
        <div className='flex w-full flex-row-reverse'>
            <div className='focus-within:outline h-10 w-[400px] focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-3'>
                        {icon}
                    </div>}
                <input type={type} id={id} placeholder={placeholder} className='h-full w-full text-primary-900  bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
                    {...(register && register(id))}
                />
            </div>
        </div>
    )
}

function Dropdown({ label, id, icon, register, comboBoxData = frameworks, containerStyle, ...rest }) {
    return (
        <div className={cn('flex items-center w-full flex-row-reverse', containerStyle)}>
            {label && <div className='flex flex-col items-end w-[250px]'>
                <label className='block text-sm font-semibold text-black w-36' htmlFor={id}>{label}</label>
            </div>}
            <div className='focus-within:outline w-[400px] pr-2 h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse items-center bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-1'>
                        {icon}
                    </div>}
                <select id={id} className='h-full w-full text-primary-900 px-[16px] border-none outline-none box-border appearance-none'
                    {...(register && register(id))}
                >
                    {comboBoxData.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <ChevronDown size={20} className='ml-3' />
            </div>
        </div>
    );
}

function Switch({ label, id, register, multiple = false, multipleId, setValue }) {
    const [isChecked, setIsChecked] = React.useState(false);

    const handleChange = (value) => {
        setIsChecked(value);
    };

    useEffect(() => {
        setValue(`${multipleId}.${id}`, isChecked);
    }, [isChecked]);
    return (
        <div className='flex w-full flex-row-reverse'>
            <div className='flex w-full items-center justify-between'>
                <SwitchComponent
                    onCheckedChange={handleChange}
                    isChecked={isChecked}
                    className={"bg-green-100"}
                />
                <label htmlFor={id} className='font-semibold ml-2'>{label}</label>
            </div>
        </div>
    )
}

function InputContainer({ label, subLabel, id, children }) {
    return (
        <div className='flex w-full flex-row-reverse'>
            <div className='flex flex-col w-[250px] items-end'>
                <label className='block text-sm  font-semibold text-black w-36'>{label}</label>
                {subLabel && <span className='text-sm text-muted-foreground'>{subLabel}</span>}
            </div>
            <div className='flex flex-col gap-3'>
                {children}
            </div>
        </div>
    )
}

export { InputContainer, Input, Dropdown, Switch }