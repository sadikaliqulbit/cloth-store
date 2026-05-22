"use client";

import { ChevronDown } from "lucide-react";

type SelectFieldProps = {
  options: string[];
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectField({ className, options, value, onChange }: SelectFieldProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <select className="checkout-input appearance-none w-full pr-10" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option
            key={index}
            className="checkout-option"
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        strokeWidth={1.5}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
      />
    </div>
  );
}

export default SelectField;