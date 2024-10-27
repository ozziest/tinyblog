import { IRegisterStep } from "@/interfaces";
import RegisterStep from "./RegisterStep";
import TextInput from "../inputs/TextInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IValidationResult, validate } from "robust-validator";
import api from "@/api";
import { notification } from "@/helpers/notication";

export const RegisterEmailStep = ({ state, setState, next }: IRegisterStep) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isEmailFound, setEmailFound] = useState(false);
  const [validation, setValidation] = useState<IValidationResult>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleProfileCheck = async () => {
    const { error, ...data } = await api.user.emailCheck({ email });

    if (error) {
      return notification.error(error);
    }
    return data;
  };

  const sendEmailConfirmation = async () => {
    try {
      const response = await api.registration.setEmail({
        email,
        csrf: state.csrf,
        cfToken: state.cfToken,
      });

      if (response.status === 201) {
        const { id } = await response.json();
        setState({ id });
        next();
      } else {
        notification.error("An error occurred");
      }
    } catch {
      notification.error("An error occurred");
    }
  };

  const handleNext = async () => {
    setValidation(undefined);
    const result = await validate(
      { email },
      { email: "required|email|max:320" },
    );
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const data = await handleProfileCheck();
    if (!data) {
      return;
    }

    setEmailFound(data.email);
    if (data.email) {
      return;
    }

    await sendEmailConfirmation();
  };

  return (
    <RegisterStep onNext={handleNext}>
      <TextInput
        name="email"
        label={t("register.email.label")}
        placeholder={t("register.email.placeholder")}
        description="Your e-mail address should be confirmed first."
        value={email}
        onChange={handleChange}
        validation={validation}
        error={isEmailFound ? "E-mail is already used!" : undefined}
      />
    </RegisterStep>
  );
};

export default RegisterEmailStep;
