import React, { useState, useRef, useEffect, JSX } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type Option = {
  value: string;
  label: string | JSX.Element;
};

type SelectDropdownProps = {
  options: Option[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(
    undefined,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = selectedValue !== undefined;
  const value = isControlled ? selectedValue : internalValue;

  const handleSelect = (option: Option) => {
    if (!isControlled) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64 " ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                option.value === value ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
