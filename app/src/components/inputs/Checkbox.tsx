import classNames from "classnames";
import React, { FC } from "react";
import { IValidationResult } from "robust-validator";
import FormGroup from "./FormGroup";

interface CheckboxProps {
  name: string;
  children: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  validation?: IValidationResult;
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  children,
  checked,
  onChange,
  disabled = false,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <FormGroup name={name} validation={validation}>
      <label
        className={classNames(
          "checkbox flex gap-2 outline-none cursor-pointer",
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={`w-6 h-6 text-neutral-500 bg-gray-200 rounded-md border-gray-300 outline-none
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        />
        <div>{children}</div>
      </label>
    </FormGroup>
  );
};

export default Checkbox;
