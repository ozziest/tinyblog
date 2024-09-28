import { useEffect, useState } from "react";

// A helper function to calculate password strength
const calculateStrength = (password?: string) => {
  let strength = 0;

  if (!password) {
    password = "";
  }

  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
};

// A helper function to map the strength score to a label
const getStrengthLabel = (strength: number) => {
  switch (strength) {
    case 1:
      return "Very Weak";
    case 2:
      return "Weak";
    case 3:
      return "Medium";
    case 4:
      return "Strong";
    case 5:
      return "Very Strong";
    default:
      return "";
  }
};

// A helper function to map the strength score to a color
const getStrengthColor = (strength: number) => {
  switch (strength) {
    case 1:
      return "bg-red-500"; // Red
    case 2:
      return "bg-orange-400"; // Orange
    case 3:
      return "bg-yellow-400"; // Yellow
    case 4:
      return "bg-green-300"; // Light Green
    case 5:
      return "bg-green-700"; // Green
    default:
      return "bg-gray-400"; // Default gray
  }
};

interface Props {
  password?: string;
}

const PasswordStrengthMeter = ({ password }: Props) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  return (
    <>
      {password && password.length > 0 && (
        <div>
          <div
            style={{
              height: "4px",
              width: `${strength * 20}%`,
              transition: "width 0.5s ease",
            }}
            className={getStrengthColor(strength)}
          />
          <p className="mt-1 text-xs font-semibold">
            {getStrengthLabel(strength)}
          </p>
        </div>
      )}
    </>
  );
};

export default PasswordStrengthMeter;
