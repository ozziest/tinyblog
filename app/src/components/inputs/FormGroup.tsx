import React from "react";
import { IValidationResult } from "robust-validator";
import ErrorText from "./ErrorText";

interface Props {
  name: string;
  label?: string;
  description?: string;
  children: React.ReactNode;
  validation?: IValidationResult;
  error?: string;
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

const FormGroup = ({
  name,
  label,
  description,
  validation,
  error,
  children,
}: Props) => {
  let isValid = true;
  let errorMessage = undefined;

  if (validation) {
    isValid = validation.fields[name];
    errorMessage = getFirstMessage(name, validation);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-semibold">{label}</label>}
      {description && (
        <p className=" text-sm text-neutral-600 font-light -mt-2">
          {description}
        </p>
      )}
      {children}
      {(!isValid || error) && <ErrorText>{errorMessage || error}</ErrorText>}
    </div>
  );
};

export default FormGroup;
