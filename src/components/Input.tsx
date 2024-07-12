import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { HelpCircleIcon } from 'lucide-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from 'utils';

type InputProps = {
    type?: string;
    placeholder?: string;
    id?: string;
    icon?: React.ReactNode;
    register?: UseFormRegisterReturn;
    className?: string;
    value?: string;
    tooltipMessage?: string;
};

function Input({ type = "text", placeholder, id, icon, register, className, tooltipMessage }: InputProps) {
    return (
        <div className={cn('h-10 w-full focus-within:border-primary transition focus-within:shadow-custom-blue-shadow flex flex-row-reverse items-center bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden', className)}>
            {icon &&
                <div className='flex items-center px-3 h-[24px] border-l-[1px] border-l-[#D0D5DD]'>
                    {icon}
                </div>}
            <input type={type} id={id} placeholder={placeholder} className='h-full w-full text-primary-900 placeholder-[#667085] text-sm bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
                {...register} />
            {(type === "number" || tooltipMessage) && <div className="flex gap-2 ml-3">
                {type === "number" && <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />}
                {tooltipMessage && <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                        <HelpCircleIcon color="#98A2B3" size={16} />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={10} className="bg-[#101828]">
                        <p>{tooltipMessage}</p>
                    </TooltipContent>
                </Tooltip>}
            </div>}
        </div>
    );
}

export default Input;
