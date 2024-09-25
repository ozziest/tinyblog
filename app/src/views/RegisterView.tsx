import { Link } from "react-router-dom";
import Button from "../components/inputs/Button";
import TextInput from "../components/inputs/TextInput";
import { useState } from "react";
import { IUserPost } from "../interfaces";
import api from "../api";
import { useTranslation } from "react-i18next";

const RegisterView = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<IUserPost>({
    email: "",
    username: "",
    name: "",
    password: "",
    passwordRetry: "",
  });

  const handleCreate = async () => {
    await api.user.createUser(state);
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

  return (
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <h2 className="font-semibold text-lg text-neutral-800 text-center">
        Create a new account
      </h2>

      <form className="py-8 flex flex-col gap-4">
        <TextInput
          label={t("register.email.label")}
          placeholder={t("register.email.placeholder")}
          value={state.email}
          onChange={(event) => handleChange(event, "email")}
        />
        <TextInput
          label={t("register.username.label")}
          placeholder={t("register.username.placeholder")}
          value={state.username}
          onChange={(event) => handleChange(event, "username")}
        />
        <TextInput
          label={t("register.name.label")}
          placeholder={t("register.name.placeholder")}
          value={state.name}
          onChange={(event) => handleChange(event, "name")}
        />
        <TextInput
          type="password"
          label={t("register.password.label")}
          placeholder={t("register.password.placeholder")}
          value={state.password}
          onChange={(event) => handleChange(event, "password")}
        />
        <TextInput
          type="password"
          label={t("register.passwordRetry.label")}
          placeholder={t("register.passwordRetry.placeholder")}
          value={state.passwordRetry}
          onChange={(event) => handleChange(event, "passwordRetry")}
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
