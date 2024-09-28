import { IValidationResult } from "robust-validator";
import FormGroup from "./FormGroup";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  validation?: IValidationResult;
  error?: string;
}

const TextInput = ({ name, label, validation, error, ...rest }: Props) => {
  return (
    <FormGroup label={label} validation={validation} name={name} error={error}>
      <input
        className="outline outline-neutral-500 rounded px-3 py-2"
        name={name}
        {...rest}
      />
    </FormGroup>
  );
};

export default TextInput;
