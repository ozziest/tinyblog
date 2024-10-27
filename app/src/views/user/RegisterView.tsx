import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IRegisterStep, IRegistrationState } from "@/interfaces";
import api from "@/api";
import { useTranslation } from "react-i18next";
import CFTurnstile from "@/components/security/CFTurnstile";
import RegisterEmailStep from "@/components/register/RegisterEmailStep";
import RegisterEmailConfirmationStep from "@/components/register/RegisterEmailConfirmationStep";
import RegisterUsernameStep from "@/components/register/RegisterUsernameStep";
import RegisterPasswordStep from "@/components/register/RegisterPasswordStep";
import RegisterBioStep from "@/components/register/RegisterBioStep";

// const RULES = {
//   email: "required|email|max:320",
//   username: "required|alpha_dash|min:3|max:30",
//   password: "required|min:8|max:50|confirmed",
//   name: "required|min:3|max:50",
// };

type Steps =
  | "Email"
  | "Confirmation"
  | "Username"
  | "Password"
  | "Bio"
  | "Sucess";

type StepCompoent = ({ next }: IRegisterStep) => JSX.Element;

const STEPS: Record<Steps, StepCompoent | undefined> = {
  Email: RegisterEmailStep,
  Confirmation: RegisterEmailConfirmationStep,
  Username: RegisterUsernameStep,
  Password: RegisterPasswordStep,
  Bio: RegisterBioStep,
  Sucess: undefined,
};

const NEXT_STEPS: Record<Steps, Steps | null> = {
  Email: "Confirmation",
  Confirmation: "Username",
  Username: "Password",
  Password: "Bio",
  Bio: "Sucess",
  Sucess: null,
};

const RegisterView = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [step, setStep] = useState<Steps>("Email");
  const [state, setState] = useState<IRegistrationState>({
    cfToken: null,
    csrf: "",
    id: "",
  });
  // const [validation, setValidation] = useState<IValidationResult>();
  // const [profile, setProfile] = useState<IProfilCheckResponse>();

  // const handleCreate = async () => {
  //   setValidation(undefined);
  //   const result = await validate(state, RULES);
  //   setValidation(result);
  //   if (result.isInvalid) {
  //     return;
  //   }

  //   const response = await api.user.createUser(state);
  //   const { error } = await response.json();
  //   if (error) {
  //     notification.error(error);
  //   } else {
  //     navigate("/auth/login");
  //   }
  // };

  // const handleChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   field: string,
  // ) => {
  //   setState({
  //     ...state,
  //     [field]: event.target.value,
  //   });
  // };

  // const handleProfileCheck = async () => {
  //   const { error, ...data } = await api.user.profileCheck({
  //     email: state.email,
  //     username: state.username,
  //   });

  //   if (error) {
  //     notification.error(error);
  //   } else {
  //     setProfile(data);
  //   }
  // };

  const handleSetState = (patch: Partial<IRegistrationState>) => {
    setState({
      ...state,
      ...patch,
    });
  };

  const handleNextState = () => {
    const nextStep = NEXT_STEPS[step];
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const prepare = async () => {
    const response = await api.shared.csrf();
    const { csrf } = await response.json();
    setState((newState) => ({ ...newState, csrf }));
  };

  const handleCFToken = (cfToken: string) => {
    setState((newState) => ({ ...newState, cfToken }));
  };

  useEffect(() => {
    prepare();
  }, []);

  if (!state.cfToken) {
    return <CFTurnstile onVerify={handleCFToken} />;
  }

  const CurrentStep = STEPS[step];
  if (!CurrentStep) {
    return undefined;
  }

  return (
    <div>
      <h2 className="font-semibold text-lg text-neutral-700 text-center">
        Create new account
      </h2>

      <CurrentStep
        next={handleNextState}
        state={state}
        setState={handleSetState}
      />

      {/* <form className="py-8 flex flex-col gap-4">
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
        <div
          className="cf-turnstile"
          data-sitekey="yourSitekey"
          data-callback="javascriptCallback"
        ></div>
        <Button type="button" onClick={handleCreate}>
          {t("register.button")}
        </Button>
      </form> */}

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
