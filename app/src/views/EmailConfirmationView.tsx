import { Link, useParams } from "react-router-dom";
import { LoadingIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import api from "../api";
import Button from "../components/inputs/Button";
import { notification } from "../helpers/notication";
import TextInput from "../components/inputs/TextInput";
import { IValidationResult, validate } from "robust-validator";

type Statuses = "loading" | "success" | "error" | "resetSuccess";

const EmailConfirmation = () => {
  const { secret, code } = useParams();
  const [status, setStatus] = useState<Statuses>("loading");
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState<IValidationResult>();
  console.log(secret, code);

  const confirm = async () => {
    const { error } = await api.user.confirmation({
      secret: secret || "",
      code: code || "",
    });
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
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

    const { error } = await api.user.confirmationReset({
      email,
    });

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
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <div className="py-10 flex justify-center text-neutral-600">
        {status === "loading" && <LoadingIcon />}
        {status === "success" && <div>Success</div>}
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
