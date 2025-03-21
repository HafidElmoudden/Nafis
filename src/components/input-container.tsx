// InputContainer.jsx
import React from 'react';
import { cn } from 'utils';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ChevronSelectorIcon from "assets/icons/chevron-selector-icon.svg";
import { ChevronDown } from 'lucide-react';

const HelpCircleIcon = ({ strokeColor = "#98A2B3", fillColor = "none", className = "" }) => (
    <svg width="16" height="17" viewBox="0 0 16 17" fill={fillColor} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
            d="M6.05992 6.43797C6.21665 5.99241 6.52602 5.61671 6.93322 5.37739C7.34042 5.13807 7.81918 5.05059 8.2847 5.13044C8.75022 5.21029 9.17246 5.45232 9.47664 5.81365C9.78081 6.17499 9.94729 6.63232 9.94659 7.10463C9.94659 8.43797 7.94659 9.10463 7.94659 9.10463M7.99992 11.7713H8.00659M14.6666 8.43797C14.6666 12.1199 11.6818 15.1046 7.99992 15.1046C4.31802 15.1046 1.33325 12.1199 1.33325 8.43797C1.33325 4.75607 4.31802 1.7713 7.99992 1.7713C11.6818 1.7713 14.6666 4.75607 14.6666 8.43797Z"
            stroke={strokeColor}
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

type InputContainerProps = {
    label: string;
    subLabel?: string;
    id: string;
    icon?: React.ReactNode;
    tooltipMessage?: string;
    errors?: Record<string, any>;
    children: React.ReactNode;
    containerStyle?: string;
    type?: string;
    isNotInput?: boolean;
};

function InputContainer({
    label,
    subLabel,
    id,
    icon,
    tooltipMessage,
    errors,
    children,
    containerStyle = "",
    type = "text",
    isNotInput = false,
}: InputContainerProps) {
    const hasError = errors && errors[id];
    const errorMessage = hasError ? String(errors[id]?.message) : null;

    return (
        <div className={cn('flex items-center w-full flex-row-reverse', containerStyle)}>
            <div className='flex flex-col items-end w-[250px]'>
                <label className='block text-sm font-semibold text-black w-36' htmlFor={id}>{label}</label>
                {subLabel && <span className="text-sm text-muted-foreground">{subLabel}</span>}
            </div>
            <div className="flex flex-col">
                <div
                    className={`focus-within:outline w-[400px] h-10 focus-within:border-transparent flex flex-row-reverse bg-white shadow-custom-light font-medium box-border rounded-lg border 
                    ${hasError
                            ? "border-[#FDA29B] focus-within:outline-[#FDA29B] shadow-custom-red"
                            : "border-accent-100 focus-within:outline-primary"
                        } outline-none shadow-sm overflow-hidden`}
                >
                    {icon && <div className='flex items-center px-3'>{icon}</div>}
                    {!isNotInput ? (
                        <div className="flex-grow">{children}</div>
                    ) : (
                        <div className="flex flex-col w-full">{children}</div>
                    )}
                    {tooltipMessage && (
                        <div className="flex items-center pl-3.5">
                            <Tooltip delayDuration={300}>
                                <TooltipTrigger>
                                    <HelpCircleIcon strokeColor={hasError ? "#F04438" : undefined} fillColor="white" className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent sideOffset={10} className="bg-[#101828]">
                                    <p>{tooltipMessage}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                    {type === "number" && (
                        <div className="flex items-center pl-3.5">
                            <img
                                src={ChevronSelectorIcon}
                                alt="selector"
                                className="w-3 h-3"
                            />
                        </div>
                    )}

                    {type === "dropdown" && (
                        <div className='flex justify-center items-center pl-3.5'>
                            <ChevronDown size={17} />
                        </div>
                    )

                    }
                </div>
                {hasError && errorMessage && (
                    <span className="text-[#F04438] text-sm mt-[6px]">
                        {errorMessage}
                    </span>
                )}
            </div>
        </div>
    );
}

export default InputContainer;