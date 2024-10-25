import { useEffect, useRef } from "react";

interface Props {
  onVerify: (token: string) => void;
}

const CFTurnstile = ({ onVerify }: Props) => {
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!turnstileRef.current) return;

    // Wait until the Cloudflare script is loaded
    const intervalId = setInterval(() => {
      if (window.turnstile) {
        clearInterval(intervalId);

        // Render Turnstile widget
        window.turnstile.render(turnstileRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
          callback: (newToken) => {
            onVerify(newToken);
          },
        });
      }
    }, 100); // Check every 100ms if `window.turnstile` is available

    return () => {
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.remove(turnstileRef.current); // Clean up when component unmounts
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div ref={turnstileRef}></div>
    </div>
  );
};

export default CFTurnstile;
