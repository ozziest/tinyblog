import { IValidationResult } from "robust-validator";
import FormGroup from "./FormGroup";

interface Props {
  name: string;
  label?: string;
  description?: string;
  validation?: IValidationResult;
  error?: string;
  children: React.ReactNode;
}

const RadioInput = ({
  name,
  label,
  description,
  validation,
  error,
  children,
}: Props) => {
  return (
    <FormGroup
      label={label}
      description={description}
      validation={validation}
      name={name}
      error={error}
    >
      <div className="grid md:grid-cols-2 gap-2">{children}</div>
    </FormGroup>
  );
};

export default RadioInput;
