// InputSection.jsx
import React from "react";
import InputContainer from "./input-container";

type InputSectionProps = {
  label: string;
  subLabel?: string;
  type?: string;
  placeholder?: string;
  id: string;
  defaultValue?: string;
  value?: string;
  icon?: React.ReactNode;
  register?: any;
  registerOptions?: any;
  tooltipMessage?: string;
  errors?: Record<string, any>;
  min?: number | string;
  max?: number | string;
};

function InputSection({
  label,
  subLabel,
  type = "text",
  placeholder,
  id,
  defaultValue,
  value,
  icon,
  register,
  registerOptions,
  tooltipMessage,
  errors,
  ...props
}: InputSectionProps) {
  return (
    <InputContainer
      label={label}
      subLabel={subLabel}
      id={id}
      icon={icon}
      tooltipMessage={tooltipMessage}
      errors={errors}
      type={type}
    >
      <input
        type={type}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        className="h-full w-full text-primary-900 bg-transparent py-[12px] px-[16px] border-none outline-none box-border"
        {...(register && register(id, registerOptions))}
        {...props}
      />

    </InputContainer>
  );
}

export default InputSection;