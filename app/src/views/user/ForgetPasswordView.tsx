import { Link } from "react-router-dom";
import Button from "@/components/inputs/Button";
import TextInput from "@/components/inputs/TextInput";
import { useState } from "react";
import { IPasswordResetPost } from "@/interfaces";
import api from "@/api";
import { IValidationResult, validate } from "robust-validator";
import { notification } from "@/helpers/notication";

const RULES = {
  email: "required|email|min:3",
};

const LoginView = () => {
  const [validation, setValidation] = useState<IValidationResult>();

  const [state, setState] = useState<IPasswordResetPost>({
    email: "",
  });

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();

    setValidation(undefined);
    const result = await validate(state, RULES);
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const { error } = await api.user.passwordReset(state);
    if (error) {
      notification.error(error);
    } else {
      notification.success(
        "The password reset linkt has been sent to your e-mail address.",
      );
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

  return (
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <h2 className="font-semibold text-lg text-neutral-800 text-center">
        Forget password
      </h2>

      <form
        className="py-8 flex flex-col gap-4"
        onSubmit={handlePasswordReset}
        action="/"
        method="post"
      >
        <TextInput
          autoComplete="email"
          name="email"
          label="Email"
          placeholder="Type your e-mail address"
          value={state.email}
          onChange={(event) => handleChange(event, "email")}
          validation={validation}
        />
        <Button type="submit">Send password reset link</Button>
      </form>

      <div className="text-center flex gap-3 justify-center">
        <Link
          to="/auth/login"
          className="text-neutral-600 hover:underline hover:text-neutral-950"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginView;
