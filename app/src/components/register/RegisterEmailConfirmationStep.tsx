import { IRegisterStep } from "@/interfaces";
import RegisterStep from "./RegisterStep";
import TextInput from "../inputs/TextInput";
import { useState } from "react";
import { IValidationResult, validate } from "robust-validator";
import api from "@/api";

export const RegisterEmailConfirmationStep = ({
  state,
  next,
}: IRegisterStep) => {
  const [code, setCode] = useState("");
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);
  const [validation, setValidation] = useState<IValidationResult>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleNext = async () => {
    setValidation(undefined);
    const result = await validate({ code }, { code: "required|min:6|max:6" });
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const response = await api.registration.confirm(state.id, code);
    if (response.status === 200) {
      next();
    } else {
      setIsNotConfirmed(false);
    }
  };

  return (
    <RegisterStep onNext={handleNext}>
      <TextInput
        name="code"
        label="Confirmation Code"
        description="Check your e-mail to get the confirmation code"
        value={code}
        onChange={(event) => handleChange(event)}
        validation={validation}
        error={isNotConfirmed ? "The code is not valid" : undefined}
        maxLength={6}
      />
    </RegisterStep>
  );
};

export default RegisterEmailConfirmationStep;
