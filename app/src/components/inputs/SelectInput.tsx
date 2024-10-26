import { useState } from "react";
import FormGroup from "./FormGroup";
import { IValidationResult } from "robust-validator";
import { ArrowDownIcon } from "../Icons";
import { IOption } from "@/interfaces";

type ModelType = IOption | IOption[] | null;

interface Props {
  value: ModelType;
  setValue: (value: ModelType) => void;
  options: IOption[];
  placeholder?: string;
  onChange: (value: IOption | IOption[] | null) => void;
  isMulti?: boolean;
  label?: string;
  validation?: IValidationResult;
  error?: string;
  name: string;
}

const SelectInput = ({
  value,
  setValue,
  options,
  placeholder = "Select...",
  onChange,
  isMulti = false,
  label,
  validation,
  error,
  name,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: IOption) => {
    if (isMulti) {
      const newSelected = value instanceof Array ? [...value] : [];
      if (newSelected.find((opt) => opt.value === option.value)) {
        setValue(newSelected.filter((opt) => opt.value !== option.value));
      } else {
        setValue([...newSelected, option]);
      }
      onChange(value);
    } else {
      setValue(option);
      onChange(option);
      setIsOpen(false);
    }
  };

  const renderSelectedText = () => {
    if (value instanceof Array && value.length > 0) {
      return value.map((opt) => opt.label).join(", ");
    } else if (value) {
      return (value as IOption).label;
    }
    return placeholder;
  };

  return (
    <FormGroup label={label} validation={validation} name={name} error={error}>
      <div className="relative w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full px-4 py-2 bg-white text-left outline outline-neutral-500 rounded"
        >
          <span className="truncate">{renderSelectedText()}</span>
          <span className="float-right mt-1">
            <ArrowDownIcon />
          </span>
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                  (
                    value instanceof Array
                      ? value.some((opt) => opt.value === option.value)
                      : value?.value === option.value
                  )
                    ? " bg-indigo-100"
                    : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </FormGroup>
  );
};

export default SelectInput;
