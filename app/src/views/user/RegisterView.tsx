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
import RegisterSuccessStep from "@/components/register/RegisterSuccessStep";

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
  Sucess: RegisterSuccessStep,
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
  const [step, setStep] = useState<Steps>("Bio");
  const [state, setState] = useState<IRegistrationState>({
    cfToken: null,
    csrf: "",
    id: "",
  });

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
