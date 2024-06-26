// DropdownSection.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import InputContainer from './input-container';

type DropdownSectionProps = {
  label: string;
  id: string;
  icon?: React.ReactNode;
  register?: any;
  comboBoxData?: { value: string; label: string }[];
  containerStyle?: string;
  registerOptions?: any;
  errors?: Record<string, any>;
  tooltipMessage?: string;
  placeholder?: string;
};

function DropdownSection({
  label,
  id,
  icon = null,
  register,
  comboBoxData = [],
  containerStyle = "",
  registerOptions = {},
  errors,
  tooltipMessage,
  placeholder,
  ...rest
}: DropdownSectionProps) {
  return (
    <InputContainer
      label={label}
      id={id}
      icon={icon}
      tooltipMessage={tooltipMessage}
      errors={errors}
      containerStyle={containerStyle}
    >
      <select
        id={id}
        className='h-full w-full text-black px-[16px] border-none outline-none box-border appearance-none'
        {...(register && register(id, registerOptions))}
        {...rest}
      >
        {/* TODO: Make this actually work because the placeholder is black instead of gray-400. */}
        {placeholder && <option value="" disabled hidden selected className='text-gray-400'>{placeholder}</option>}
        {comboBoxData.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
      {/* TODO: Make the ChevronDown icon align correctly. Add the placeholder and a tooltip message to a dropdown instance to see what i mean. */}
      <div className='flex justify-center items-center pl-3.5'>
        <ChevronDown size={17} />
      </div>
    </InputContainer>
  );
}

export default DropdownSection;