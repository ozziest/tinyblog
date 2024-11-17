import { error } from "@/helpers/notication";
import { useEffect, useRef } from "react";

interface Props {
  onVerify: (token: string) => void;
}

const CFTurnstile = ({ onVerify }: Props) => {
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!turnstileRef.current) return;

    // Ensure the script is loaded
    const intervalId = setInterval(() => {
      if (window.turnstile) {
        clearInterval(intervalId);

        // Render the Turnstile widget
        window.turnstile.render(turnstileRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
          callback: (newToken) => {
            onVerify(newToken); // Token verified successfully
          },
          "error-callback": () => {
            error(
              "We encountered an issue verifying your request. Please try again. If the problem persists, ensure your browser is up-to-date or try using a different one.",
            );
            // Optional: Notify the user and/or retry rendering
            if (turnstileRef.current && window.turnstile) {
              window.turnstile.reset(turnstileRef.current);
            }
          },
        });
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.remove(turnstileRef.current); // Clean up on unmount
      }
    };
  }, [onVerify]);

  return (
    <div className="flex justify-center">
      <div ref={turnstileRef}></div>
    </div>
  );
};

export default CFTurnstile;
