import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/inputs/Button";
import TextInput from "@/components/inputs/TextInput";
import { useState } from "react";
import { IProfilCheckResponse, IUserPost } from "@/interfaces";
import api from "@/api";
import { useTranslation } from "react-i18next";
import { IValidationResult, validate } from "robust-validator";
import { notification } from "@/helpers/notication";
import PasswordStrengthMeter from "@/components/inputs/PasswordStrengthMeter";

const RULES = {
  email: "required|email|max:320",
  username: "required|min:3|max:30",
  password: "required|min:8|max:50|confirmed",
  name: "required|min:3|max:50",
};

const RegisterView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<IUserPost>({
    email: "",
    username: "",
    name: "",
    password: "",
    password_confirmed: "",
  });
  const [validation, setValidation] = useState<IValidationResult>();
  const [profile, setProfile] = useState<IProfilCheckResponse>();

  const handleCreate = async () => {
    setValidation(undefined);
    const result = await validate(state, RULES);
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const { error } = await api.user.createUser(state);
    if (error) {
      notification.error(error);
    } else {
      navigate("/auth/login");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  const handleProfileCheck = async () => {
    const { error, ...data } = await api.user.profileCheck({
      email: state.email,
      username: state.username,
    });

    if (error) {
      notification.error(error);
    } else {
      setProfile(data);
    }
  };

  return (
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <h2 className="font-semibold text-lg text-neutral-800 text-center">
        Create a new account
      </h2>

      <form className="py-8 flex flex-col gap-4">
        <TextInput
          name="email"
          label={t("register.email.label")}
          placeholder={t("register.email.placeholder")}
          value={state.email}
          onChange={(event) => handleChange(event, "email")}
          validation={validation}
          onBlur={handleProfileCheck}
          error={
            profile?.email === true ? "E-mail is already used!" : undefined
          }
        />
        <TextInput
          name="username"
          label={t("register.username.label")}
          placeholder={t("register.username.placeholder")}
          value={state.username}
          onChange={(event) => handleChange(event, "username")}
          onBlur={handleProfileCheck}
          validation={validation}
          error={
            profile?.username === true
              ? "The username is already taken!"
              : undefined
          }
        />
        <TextInput
          name="name"
          label={t("register.name.label")}
          placeholder={t("register.name.placeholder")}
          value={state.name}
          onChange={(event) => handleChange(event, "name")}
          validation={validation}
        />
        <TextInput
          name="password"
          type="password"
          label={t("register.password.label")}
          placeholder={t("register.password.placeholder")}
          value={state.password}
          onChange={(event) => handleChange(event, "password")}
          validation={validation}
        />
        <PasswordStrengthMeter password={state.password} />
        <TextInput
          type="password"
          name="password_confirmed"
          label={t("register.passwordRetry.label")}
          placeholder={t("register.passwordRetry.placeholder")}
          value={state.password_confirmed}
          onChange={(event) => handleChange(event, "password_confirmed")}
          validation={validation}
        />
        <Button type="button" onClick={handleCreate}>
          {t("register.button")}
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-neutral-600 hover:underline hover:text-neutral-950"
        >
          {t("register.loginAccountLink")}
        </Link>
      </div>
    </div>
  );
};

export default RegisterView;
