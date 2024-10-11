import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingIcon, SuccessIcon } from "@/components/Icons";
import { useEffect, useState } from "react";
import api from "@/api";
import Button from "@/components/inputs/Button";
import { notification } from "@/helpers/notication";
import TextInput from "@/components/inputs/TextInput";
import { IValidationResult, validate } from "robust-validator";

type Statuses = "loading" | "success" | "error" | "resetSuccess";

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const { secret, code } = useParams();
  const [status, setStatus] = useState<Statuses>("loading");
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState<IValidationResult>();

  const confirm = async () => {
    const response = await api.user.confirmation({
      secret: secret || "",
      code: code || "",
    });
    const { error } = await response.json();
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        navigate("/auth/login");
      }, 3000);
    }
  };

  const handleResetConfirmationLink = async () => {
    // Validate the email address
    setValidation(undefined);
    const result = await validate({ email }, { email: "required|email" });
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    const response = await api.user.confirmationReset({
      email,
    });

    const { error } = await response.json();

    if (error) {
      notification.error(error);
    } else {
      setStatus("resetSuccess");
    }
  };

  useEffect(() => {
    confirm();
  }, []);

  return (
    <div>
      <div className="py-10 flex justify-center text-neutral-600">
        {status === "loading" && <LoadingIcon />}
        {status === "success" && (
          <div className="text-green-700 flex flex-col gap-3">
            <div className="flex justify-center">
              <SuccessIcon />
            </div>
            <div className="text-center text-neutral-500">
              <p>The confirmation is completed.</p>
              <p>You will be redirected to the login page.</p>
              <p>Please wait!</p>
            </div>
          </div>
        )}
        {status === "resetSuccess" && (
          <div className="text-green-700 flex flex-col gap-3">
            <div className="flex justify-center">
              <SuccessIcon />
            </div>
            <div className="text-center text-neutral-500">
              <p>
                A new confirmation link has been sent to your e-mail address.
                Please check your inbox!
              </p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div>
            <div className="flex flex-col items-center">
              <div className="text-red-600 py-2 text-3xl font-bold">Error</div>
              <div className="text-neutral-700 py-3 text-center">
                Confirmation link is not acceptable anymore. You can create a
                new one by using your e-mail address.
              </div>
              <div className="w-full py-3">
                <TextInput
                  autoComplete="email"
                  name="email"
                  label="E-mail address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  validation={validation}
                />
              </div>
              <Button onClick={handleResetConfirmationLink} isBlock>
                Resend the link
              </Button>

              <div className="pt-10">
                <Link to="/auth/login" className="text-sm text-neutral-500">
                  Go to the login page
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
