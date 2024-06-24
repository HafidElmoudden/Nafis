import React from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import HelpCircleIcon from 'assets/icons/help-circle-icon.svg';
import ChevronSelectorIcon from 'assets/icons/chevron-selector-icon.svg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type InputSectionProps = {
  label: string;
  subLabel?: string;
  type?: string;
  placeholder?: string;
  id: string;
  defaultValue?: string;
  value?: string;
  icon?: React.ReactNode;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions<FieldValues, string> | undefined
  notInput?: boolean;
  children?: React.ReactNode;
  inputContainerStyle?: string;
  min?: number | string;
  max?: number | string;
  helpTooltipMessage?: string;
};

function InputSection({
  label,
  subLabel,
  type = 'text',
  placeholder,
  id,
  defaultValue,
  value,
  icon,
  register,
  registerOptions,
  notInput,
  inputContainerStyle,
  helpTooltipMessage,
  children, ...props
}: InputSectionProps) {
  return (
    <div className='flex w-full flex-row-reverse'>
      <div className='flex flex-col items-end w-[250px]'>
        <label className='block text-sm font-semibold text-black w-36' htmlFor={id}>{label}</label>
        {subLabel && <span className='text-sm text-muted-foreground'>{subLabel}</span>}
      </div>
      {!notInput && (
        <div className='focus-within:outline w-[400px] h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
          {icon && (
            <div className='flex items-center px-3'>
              {icon}
            </div>
          )}
          <input
            type={type}
            id={id}
            defaultValue={defaultValue}
            placeholder={placeholder}
            value={value}
            className='h-full w-full text-primary-900 bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
            {...(register && register(id))}
            {...props}
          />
          <div className="flex justify-center items-center gap-2 pl-3.5">
            {type === "number" && (
              <div className="w-4 h-4 flex justify-center items-center">
                <img src={ChevronSelectorIcon} alt="selector" className="w-3 h-3" />
              </div>
            )}
            {helpTooltipMessage && (
              <div className="w-4 h-4">
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <img src={HelpCircleIcon} alt="help" className="w-full h-full" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1a1a1a] text-white p-2 rounded-lg text-sm relative before:absolute before:content-[''] before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-[5px] before:border-t-[#1a1a1a] before:border-r-transparent before:border-b-transparent before:border-l-transparent">
                    <p>{helpTooltipMessage}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

        </div>
      )}
      {children}
    </div>
  );
}

export default InputSection;
