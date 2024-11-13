import { IRegisterStep } from "@/interfaces";
import RegisterStep from "./RegisterStep";
import TextInput from "../inputs/TextInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IValidationResult, validate } from "robust-validator";
import api from "@/api";
import { notification } from "@/helpers/notication";
import PasswordStrengthMeter from "../inputs/PasswordStrengthMeter";
import { loading } from "@/helpers/layout";

export const RegisterPasswordStep = ({ state, next }: IRegisterStep) => {
  const { t } = useTranslation();
  const [internalState, setInternalState] = useState({
    password: "",
    password_confirmed: "",
  });
  const [validation, setValidation] = useState<IValidationResult>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setInternalState({
      ...internalState,
      [field]: event.target.value,
    });
  };

  const patchData = async () => {
    loading(true);
    const response = await api.registration.patch(state.id, {
      password: internalState.password,
    });
    loading(false);

    if (response.status === 200) {
      return next();
    } else if (response.status === 400) {
      const { error } = await response.json();
      return notification.error(error);
    }

    notification.error("An error occurred");
  };

  const handleNext = async () => {
    setValidation(undefined);
    const result = await validate(internalState, {
      password: "required|min:8|max:50|confirmed",
    });
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    await patchData();
  };

  return (
    <RegisterStep onNext={handleNext}>
      <div className="flex flex-col gap-2">
        <TextInput
          name="password"
          type="password"
          label={t("register.password.label")}
          placeholder={t("register.password.placeholder")}
          value={internalState.password}
          onChange={(event) => handleChange(event, "password")}
          validation={validation}
        />
        <PasswordStrengthMeter password={internalState.password} />
        <TextInput
          type="password"
          name="password_confirmed"
          label={t("register.passwordRetry.label")}
          placeholder={t("register.passwordRetry.placeholder")}
          value={internalState.password_confirmed}
          onChange={(event) => handleChange(event, "password_confirmed")}
          validation={validation}
        />
      </div>
    </RegisterStep>
  );
};

export default RegisterPasswordStep;
