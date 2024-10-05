import { IValidationResult } from "robust-validator";
import FormGroup from "./FormGroup";
import { useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  validation?: IValidationResult;
  error?: string;
}

const CaptchaInput = ({ name, validation, error, ...rest }: Props) => {
  const [url, setURL] = useState("http://localhost:3005/api/v1/captcha");

  const handleReset = () => {
    setURL(`http://localhost:3005/api/v1/captcha?v=${Date.now()}`);
  };

  return (
    <FormGroup
      label="Captcha"
      validation={validation}
      name="captcha"
      error={error}
    >
      <div className="border border-neutral-300 rounded flex justify-center">
        <img src={url} height={80} width={300} />
      </div>
      <div className="pb-1">
        <button
          type="button"
          className="transition text-neutral-600 cursor-pointer hover:underline hover:text-neutral-900 text-xs font-medium"
          onClick={handleReset}
        >
          Reset captcha code
        </button>
      </div>
      <input
        className="outline outline-neutral-500 rounded px-3 py-2"
        name={name}
        {...rest}
      />
    </FormGroup>
  );
};

export default CaptchaInput;
