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
