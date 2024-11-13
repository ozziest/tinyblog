import { IValidationResult } from "robust-validator";
import FormGroup from "./FormGroup";
import classNames from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  validation?: IValidationResult;
  error?: string;
}

const TextInput = ({
  name,
  label,
  description,
  validation,
  error,
  ...rest
}: Props) => {
  return (
    <FormGroup
      label={label}
      description={description}
      validation={validation}
      name={name}
      error={error}
    >
      <input
        className={classNames(
          "outline outline-neutral-500 rounded px-3 py-2 disabled:bg-neutral-100 disabled:outline-neutral-200 disabled:text-neutral-500",
        )}
        name={name}
        {...rest}
      />
    </FormGroup>
  );
};

export default TextInput;
