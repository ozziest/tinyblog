import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import Button from "../components/inputs/Button";
import { notification } from "../helpers/notication";
import TextInput from "../components/inputs/TextInput";
import { IValidationResult, validate } from "robust-validator";
import PasswordStrengthMeter from "../components/inputs/PasswordStrengthMeter";
import { IChangePasswordPost } from "../interfaces";

const RULES = {
  password: "required|min:8|max:50|confirmed",
};

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const { secret, code } = useParams();
  const [state, setState] = useState<IChangePasswordPost>({
    secret: secret || "",
    code: code || "",
    password: "",
    password_confirmed: "",
  });
  const [validation, setValidation] = useState<IValidationResult>();

  const handleCreate = async () => {
    setValidation(undefined);
    const result = await validate(state, RULES);
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const { error } = await api.user.changePassword(state);
    if (error) {
      notification.error(error);
    } else {
      notification.success("Your password has been changed.");
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

  return (
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <h2 className="font-semibold text-lg text-neutral-800 text-center">
        Reset your password
      </h2>

      <form className="py-8 flex flex-col gap-4">
        <TextInput
          name="password"
          type="password"
          label="Password"
          placeholder="Type a new password"
          value={state.password}
          onChange={(event) => handleChange(event, "password")}
          validation={validation}
        />
        <PasswordStrengthMeter password={state.password} />
        <TextInput
          type="password"
          name="password_confirmed"
          label="Password (Retry)"
          placeholder="Type the same password here"
          value={state.password_confirmed}
          onChange={(event) => handleChange(event, "password_confirmed")}
          validation={validation}
        />
        <Button type="button" onClick={handleCreate}>
          Save password
        </Button>
      </form>

      <div className="text-center">
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

export default ResetPasswordView;
