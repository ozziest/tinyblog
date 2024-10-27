import { IRegisterStep } from "@/interfaces";
import RegisterStep from "./RegisterStep";
import TextInput from "../inputs/TextInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IValidationResult, validate } from "robust-validator";
import api from "@/api";
import { notification } from "@/helpers/notication";

export const RegisterUsernameStep = ({ state, next }: IRegisterStep) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [isUsernameFound, setUsernameFound] = useState(false);
  const [validation, setValidation] = useState<IValidationResult>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleProfileCheck = async () => {
    const { error, ...data } = await api.user.usernameCheck({ username });

    if (error) {
      return notification.error(error);
    }

    return data;
  };

  const patchData = async () => {
    const response = await api.registration.patch(state.id, {
      username,
    });

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
    const result = await validate(
      { username },
      { username: "required|alpha_dash|min:3|max:30" },
    );
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const data = await handleProfileCheck();
    if (!data) {
      return;
    }

    setUsernameFound(data.username);
    if (data.username) {
      return;
    }

    await patchData();
  };

  return (
    <RegisterStep onNext={handleNext}>
      <TextInput
        name="username"
        label={t("register.username.label")}
        placeholder={t("register.username.placeholder")}
        description="You can not change your username later."
        value={username}
        onChange={(event) => handleChange(event)}
        validation={validation}
        error={isUsernameFound ? "The username is already taken!" : undefined}
      />
    </RegisterStep>
  );
};

export default RegisterUsernameStep;
