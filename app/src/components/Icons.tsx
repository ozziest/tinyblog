export const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
    >
      <circle cx="50" cy="50" r="45" fill="currentColor" strokeWidth="2" />

      <line
        x1="30"
        y1="30"
        x2="70"
        y2="70"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="30"
        x2="30"
        y2="70"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const LoadingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="currentColor"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="150"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export const SuccessIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
      />
      <polyline
        points="30,55 45,70 70,40"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LogoIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
    >
      <path
        d="M20,40 Q20,20 40,20 H60 Q80,20 80,40 V60 Q80,80 60,80 H40 L20,90 Z"
        fill="currentColor"
        stroke="none"
      />

      <path
        d="M30,45 Q30,30 45,30 H55 Q70,30 70,45 V55 Q70,70 55,70 H45 Z"
        fill="white"
        stroke="none"
      />

      <circle cx="40" cy="50" r="3" fill="currentColor" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
      <circle cx="60" cy="50" r="3" fill="currentColor" />
    </svg>
  );
};
