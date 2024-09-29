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

export const ReplyIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LikeIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShareIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.23 3.23 0 0 0 0-1.39l7.09-4.11a2.5 2.5 0 1 0-1.14-1.66L7.77 9.65a2.5 2.5 0 1 0 0 4.7l7.09 4.11a2.5 2.5 0 1 0 3.14-2.38z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ViewCountIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6.05-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"
        fill="currentColor"
      />
    </svg>
  );
};
