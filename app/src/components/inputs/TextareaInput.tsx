import { IValidationResult } from "robust-validator";
import FormGroup from "./FormGroup";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  validation?: IValidationResult;
  error?: string;
}

const TextareaInput = ({ name, label, validation, error, ...rest }: Props) => {
  return (
    <FormGroup label={label} validation={validation} name={name} error={error}>
      <textarea
        className="outline outline-neutral-500 rounded px-3 py-2 disabled:bg-neutral-100 disabled:outline-neutral-200 disabled:text-neutral-500"
        name={name}
        rows={3}
        {...rest}
      />
    </FormGroup>
  );
};

export default TextareaInput;
