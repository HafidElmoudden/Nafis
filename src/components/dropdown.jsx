import { Arrow } from '@radix-ui/react-popover';
import { ArrowDown, ChevronDown } from 'lucide-react';
import React from 'react';


const frameworks = [
    {
      value: "third_class",
      label: "الصف الثالث",
    },
    {
      value: "sixth_class",
      label: "الصف السادس",
    },
    {
      value: "third_mid_class",
      label: "الصف الثالث المتوسط",
    },
  ]

function DropdownSection({ label, id, icon, register, comboBoxData = frameworks, ...rest }) {
    return (
        <div className='flex items-center gap-28 w-full flex-row-reverse'>
            <label className='block text-sm font-semibold text-black w-36' htmlFor={id}>{label}</label>
            <div className='focus-within:outline w-[400px] pr-2 h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse items-center bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-3'>
                        {icon}
                    </div>}
                <select id={id} className='h-full w-full text-primary-900 px-[16px] border-none outline-none box-border appearance-none'>
                    {comboBoxData.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <ChevronDown size={20} className='ml-3'/>
            </div>
        </div>
    );
}

export default DropdownSection;
