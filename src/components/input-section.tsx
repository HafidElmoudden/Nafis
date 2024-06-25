// InputSection.jsx
import React from "react";
import ChevronSelectorIcon from "assets/icons/chevron-selector-icon.svg";
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
      {type === "number" && (
        <div className="flex items-center pl-3.5">
          <img
            src={ChevronSelectorIcon}
            alt="selector"
            className="w-3 h-3"
          />
        </div>
      )}
    </InputContainer>
  );
}

export default InputSection;