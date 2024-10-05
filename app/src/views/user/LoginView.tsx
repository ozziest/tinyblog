import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/inputs/Button";
import TextInput from "@/components/inputs/TextInput";
import { useState } from "react";
import { ILoginPost } from "@/interfaces";
import api from "@/api";
import useAuthStore from "@/stores/authStore";
import { useTranslation } from "react-i18next";
import { IValidationResult, validate } from "robust-validator";
import { notification } from "@/helpers/notication";
import { ILoginResponseApi } from "@/types/ApiTypes";
import CFTurnstile from "@/components/security/CFTurnstile";

const RULES = {
  email: "required|min:3",
  password: "required|min:8",
};

const LoginView = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [validation, setValidation] = useState<IValidationResult>();

  const [state, setState] = useState<ILoginPost>({
    cfToken: null,
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setValidation(undefined);
    const result = await validate(state, RULES);
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const response = await api.user.login(state);
    const { error, ...data } = await response.json();
    if (error) {
      notification.error(error);
    } else {
      authStore.init(data as ILoginResponseApi);
      navigate("/");
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

  const handleCFToken = (cfToken: string) => {
    setState((newState) => ({ ...newState, cfToken }));
  };

  if (!state.cfToken) {
    return (
      <div className="p-8 rounded w-[500px]">
        <CFTurnstile onVerify={handleCFToken} />
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <h2 className="font-semibold text-lg text-neutral-800 text-center">
        {t("login.title")}
      </h2>

      <form
        className="py-8 flex flex-col gap-4"
        onSubmit={handleLogin}
        action="/"
        method="post"
      >
        <TextInput
          autoComplete="email"
          name="email"
          label={t("login.email.label")}
          placeholder={t("login.email.placeholder")}
          value={state.email}
          onChange={(event) => handleChange(event, "email")}
          validation={validation}
        />
        <TextInput
          autoComplete="password"
          type="password"
          name="password"
          label={t("login.password.label")}
          placeholder={t("login.password.placeholder")}
          value={state.password}
          onChange={(event) => handleChange(event, "password")}
          validation={validation}
        />
        <Button type="submit">{t("login.button")}</Button>
      </form>

      <div className="text-center flex gap-3 justify-center">
        <Link
          to="/auth/register"
          className="text-neutral-600 hover:underline hover:text-neutral-950"
        >
          Register
        </Link>
        |
        <Link
          to="/auth/forget-password"
          className="text-neutral-600 hover:underline hover:text-neutral-950"
        >
          Forget password
        </Link>
        |
        <Link
          to="/confirm/email"
          className="text-neutral-600 hover:underline hover:text-neutral-950"
        >
          E-mail confirmation
        </Link>
      </div>
    </div>
  );
};

export default LoginView;
