import { Arrow } from '@radix-ui/react-popover';
import { ArrowDown, ChevronDown } from 'lucide-react';
import React from 'react';
import { cn } from 'utils';


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



function DropdownSection({ label, id, icon, register, comboBoxData = frameworks, containerStyle, ...rest }) {
    return (
        <div className={cn('flex items-center w-full flex-row-reverse', containerStyle)}>
            <div className='flex flex-col items-end w-[250px]'>
                <label className='block text-sm  font-semibold text-black w-36' htmlFor={id}>{label}</label>
            </div>
            <div className='focus-within:outline w-[400px] pr-2 h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse items-center bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-1'>
                        {icon}
                    </div>}
                <select id={id} className='h-full w-full text-primary-900 px-[16px] border-none outline-none box-border appearance-none'>
                    {comboBoxData.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <ChevronDown size={20} className='ml-3' />
            </div>
        </div>
    );
}

export default DropdownSection;
