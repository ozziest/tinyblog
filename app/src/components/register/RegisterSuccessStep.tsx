import { IRegisterStep } from "@/interfaces";
import { useEffect, useState } from "react";
import LoadingSpinner from "../layout/LoadingSpinner";
import api from "@/api";
import { notification } from "@/helpers/notication";
import { SuccessIcon } from "../Icons";
import { useNavigate } from "react-router-dom";

export const RegisterSuccessStep = ({ state }: IRegisterStep) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const complete = async () => {
    try {
      const response = await api.registration.complete(state.id);
      setLoading(false);

      if (response.status === 200) {
        setSuccess(true);
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          navigate("/auth/login");
        }, 3000);
      }
    } catch {
      setLoading(false);
      notification.error("An error occurred!");
    }
  };

  useEffect(() => {
    complete();
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4">
      {loading && <LoadingSpinner />}
      {success && (
        <div className="text-green-700 flex flex-col gap-3">
          <div className="flex justify-center">
            <SuccessIcon />
          </div>
          <div className="text-center text-neutral-500">
            <p>Your account is ready!</p>
            <p>You will be redirected to the login page.</p>
            <p>Please wait!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterSuccessStep;
