import React from "react";
import { IValidationResult } from "robust-validator";

interface Props {
  name: string;
  label?: string;
  children: React.ReactNode;
  validation?: IValidationResult;
}

const getFirstMessage = (
  field: string,
  validation?: IValidationResult,
): string | undefined => {
  if (!validation) {
    return undefined;
  }

  const errors = validation.errors[field];
  if (!errors || errors.length === 0) {
    return undefined;
  }

  return errors[0].message;
};

const FormGroup = ({ name, label, validation, children }: Props) => {
  let isValid = true;
  let errorMessage = undefined;

  if (validation) {
    isValid = validation.fields[name];
    errorMessage = getFirstMessage(name, validation);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-semibold">{label}</label>}
      {children}
      {!isValid && (
        <div className="text-red-500 text-sm font-semibold">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormGroup;
