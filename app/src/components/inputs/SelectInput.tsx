import { useEffect, useRef, useState } from "react";
import FormGroup from "./FormGroup";
import { IValidationResult } from "robust-validator";
import { ArrowDownIcon, CheckIcon } from "../Icons";
import { IOption } from "@/interfaces";
import classNames from "classnames";

export type SelectInputModelType = IOption | IOption[] | null;
export type SelectAction = "select" | "deselect";

interface Props {
  value: SelectInputModelType;
  setValue: (value: SelectInputModelType) => void;
  onSelect?: (value: IOption, action: SelectAction) => void;
  options: IOption[];
  placeholder?: string;
  isMulti?: boolean;
  label?: string;
  description?: string;
  validation?: IValidationResult;
  error?: string;
  name: string;
}

const SelectInput = ({
  value,
  setValue,
  onSelect,
  options,
  placeholder = "Select...",
  isMulti = false,
  label,
  description,
  validation,
  error,
  name,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  const emitSelection = (option: IOption, action: SelectAction) => {
    if (onSelect) {
      onSelect(option, action);
    }
  };

  const handleSelect = (option: IOption) => {
    if (isMulti) {
      const newSelected = value instanceof Array ? [...value] : [];
      const isAlreadySelected = newSelected.find(
        (opt) => opt.value === option.value,
      );
      if (isAlreadySelected) {
        setValue(newSelected.filter((opt) => opt.value !== option.value));
        emitSelection(option, "deselect");
      } else {
        setValue([...newSelected, option]);
        emitSelection(option, "select");
      }
    } else {
      setValue(option);
      setIsOpen(false);
    }
  };

  const renderSelectedText = () => {
    if (value instanceof Array) {
      if (value.length > 0) {
        return value.map((opt) => opt.label).join(", ");
      }

      return placeholder;
    }

    if (value) {
      return (value as IOption).label;
    }

    return placeholder;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSelected = (option: IOption) => {
    return value instanceof Array
      ? value.some((opt) => opt.value === option.value)
      : value?.value === option.value;
  };

  const isSelectedColor = (option: IOption) => {
    if (isMulti) {
      return false;
    }

    return isSelected(option);
  };

  return (
    <FormGroup
      label={label}
      description={description}
      validation={validation}
      name={name}
      error={error}
    >
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
          <div
            className="absolute mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg z-50 max-h-60 overflow-auto"
            ref={menuRef}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={classNames(
                  "px-4 py-2 cursor-pointer hover:bg-indigo-100 flex gap-1 items-center",
                  { "bg-indigo-100": isSelectedColor(option) },
                )}
              >
                {isMulti && isSelected(option) && (
                  <div className="w-6 text-indigo-500">
                    <CheckIcon size={20} />
                  </div>
                )}
                {isMulti && !isSelected(option) && <div className="w-6"></div>}
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
