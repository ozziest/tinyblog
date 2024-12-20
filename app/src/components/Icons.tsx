interface IconProps {
  size: number;
}

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

export const LogoIcon = ({ size }: IconProps) => {
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

export const ReplyIcon = ({ size }: IconProps) => {
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

export const LikeIcon = ({ size }: IconProps) => {
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

export const ShareIcon = ({ size }: IconProps) => {
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

export const ViewCountIcon = ({ size }: IconProps) => {
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

export const HomeIcon = ({ size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
};

export const LogoutIcon = ({ size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M10 17l1.41-1.41L7.83 12H20v-2H7.83l3.58-3.59L10 5l-6 6 6 6zm9-14H5c-1.1 0-2 .9-2 2v10h2V5h14v14H5v-2H3v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
};

export const DailyIcon = ({ size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M7 2v2M17 2v2M3 8h18" />
      <rect x="8" y="11" width="8" height="8" rx="1" ry="1" />
    </svg>
  );
};

export const HashtagIcon = ({ size }: IconProps) => {
  return (
    <svg
      fill="currentColor"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 490 490"
    >
      <path
        d="M64.333,490h58.401l33.878-137.69h122.259L245.39,490h58.401l33.878-137.69h119.92v-48.162h-108.24l29.2-117.324h79.04
	v-48.162H390.23L424.108,0H365.31l-33.878,138.661H208.79L242.668,0h-58.415l-33.864,138.661H32.411v48.162h106.298l-28.818,117.324
	h-77.48v48.162h65.8L64.333,490z M197.11,186.824h122.642l-29.2,117.324H168.292L197.11,186.824z"
      />
    </svg>
  );
};

export const ProfileIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="20" r="12" fill="currentColor" />

      <path
        d="M32 36c-12 0-22 7-22 16v4h44v-4c0-9-10-16-22-16z"
        fill="currentColor"
      />
    </svg>
  );
};

export const NotificationIcon = ({ size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 4C18.48 4 14 8.48 14 14V20C14 21.5 13.47 23.37 12.53 24.84L10 28H38L35.47 24.84C34.53 23.37 34 21.5 34 20V14C34 8.48 29.52 4 24 4Z"
        fill="black"
      />
      <path
        d="M20 38C20 39.66 21.34 41 23 41H25C26.66 41 28 39.66 28 38H20Z"
        fill="black"
      />
    </svg>
  );
};

export const MentionIcon = ({ size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".35em"
        fontSize="80"
        fontFamily="Arial"
        fill="currentColor"
      >
        @
      </text>
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export const ArrowDownIcon = () => {
  return (
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export const OptionsIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 16H26M34 16H40M22 32H40M8 32H14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 36C20.2091 36 22 34.2091 22 32C22 29.7909 20.2091 28 18 28C15.7909 28 14 29.7909 14 32C14 34.2091 15.7909 36 18 36Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M30 20C32.2091 20 34 18.2091 34 16C34 13.7909 32.2091 12 30 12C27.7909 12 26 13.7909 26 16C26 18.2091 27.7909 20 30 20Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
};

export const LocationIcon = ({ size }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

export const CheckIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 7L10 17L5 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const NewbiesIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49999 10.306C6.78799 13.381 10.7465 14.1635 9.81199 16.33C8.87699 18.496 6.78449 18.063 7.01799 20.229C7.25199 22.3955 10.021 22.426 12.542 21.121C17.5835 18.5105 18.6355 12.8085 16.354 10.306C13.55 7.23101 8.21199 7.23101 7.49999 10.306Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.3033 7.91657C16.7264 8.27157 17.501 8.0449 18.0335 7.41029C18.566 6.77568 18.6548 5.97344 18.2317 5.61843C17.8086 5.26343 17.034 5.4901 16.5015 6.12471C15.969 6.75933 15.8802 7.56157 16.3033 7.91657Z"
        fill="currentColor"
      />
      <path
        d="M14.0565 6.66118C14.5571 6.89459 15.2467 6.47515 15.5968 5.72434C15.9469 4.97353 15.8249 4.17566 15.3244 3.94226C14.8239 3.70885 14.1343 4.12829 13.7842 4.8791C13.4341 5.62991 13.556 6.42777 14.0565 6.66118Z"
        fill="currentColor"
      />
      <path
        d="M11.5337 6.29334C12.083 6.35107 12.5984 5.72997 12.685 4.90609C12.7716 4.0822 12.3966 3.3675 11.8473 3.30977C11.298 3.25204 10.7826 3.87314 10.696 4.69703C10.6094 5.52092 10.9845 6.23561 11.5337 6.29334Z"
        fill="currentColor"
      />
      <path
        d="M7.68405 5.87939C8.46252 5.59605 8.78734 4.52493 8.40955 3.48698C8.03177 2.44902 7.09444 1.83728 6.31597 2.12062C5.53751 2.40396 5.21269 3.47508 5.59047 4.51304C5.96826 5.55099 6.90559 6.16273 7.68405 5.87939Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18.1185 9.73219C18.4735 10.1553 19.2757 10.0666 19.9103 9.53405C20.5449 9.00155 20.7716 8.2269 20.4166 7.80383C20.0616 7.38075 19.2593 7.46946 18.6247 8.00196C17.9901 8.53446 17.7635 9.30911 18.1185 9.73219Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GitHubIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const NotificationOffIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.84 22.73L18.11 20H2.99999V19L4.99999 17V11C4.99999 9.86 5.28999 8.73 5.82999 7.72L1.10999 3L2.38999 1.73L22.11 21.46L20.84 22.73ZM19 15.8V11C19 7.9 16.97 5.17 14 4.29V4C14 3.46956 13.7893 2.96085 13.4142 2.58578C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9608 2.21071 10.5858 2.58578C10.2107 2.96085 9.99999 3.46956 9.99999 4V4.29C9.38999 4.47 8.79999 4.74 8.25999 5.09L19 15.8ZM12 23C12.5304 23 13.0391 22.7893 13.4142 22.4142C13.7893 22.0391 14 21.5304 14 21H9.99999C9.99999 21.5304 10.2107 22.0391 10.5858 22.4142C10.9608 22.7893 11.4696 23 12 23Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const AboutIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00003 1.33334C11.682 1.33334 14.6667 4.31809 14.6667 8C14.6667 11.6819 11.682 14.6667 8.00003 14.6667C4.31816 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.31809 4.31816 1.33334 8.00003 1.33334ZM8.66816 7.33334H7.33484V11.3333H8.66816V7.33334ZM8.00681 4.5C7.52075 4.5 7.16816 4.85062 7.16816 5.32409C7.16816 5.81672 7.51147 6.16669 8.00681 6.16669C8.48291 6.16669 8.83484 5.81669 8.83484 5.33334C8.83484 4.85066 8.48291 4.5 8.00681 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SettingsIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.279 2.152C13.909 2 13.439 2 12.5 2C11.561 2 11.092 2 10.721 2.152C10.4769 2.25175 10.2549 2.39878 10.0679 2.58465C9.88079 2.77051 9.73233 2.99154 9.63101 3.235C9.53701 3.458 9.50101 3.719 9.48601 4.098C9.47887 4.3725 9.40208 4.64068 9.26284 4.87736C9.1236 5.11403 8.92648 5.31142 8.69001 5.451C8.44875 5.5851 8.17755 5.65615 7.90154 5.65754C7.62552 5.65894 7.35361 5.59065 7.11101 5.459C6.77301 5.281 6.52801 5.183 6.28601 5.151C5.75659 5.08192 5.22128 5.2242 4.79601 5.547C4.47801 5.789 4.24301 6.193 3.77401 7C3.30401 7.807 3.07001 8.21 3.01701 8.605C2.94701 9.131 3.09101 9.663 3.41701 10.084C3.56501 10.276 3.77401 10.437 4.09701 10.639C4.57401 10.936 4.88001 11.442 4.88001 12C4.88001 12.558 4.57401 13.064 4.09801 13.36C3.77401 13.563 3.56501 13.724 3.41601 13.916C3.25558 14.1242 3.13776 14.362 3.0693 14.6158C3.00083 14.8696 2.98307 15.1343 3.01701 15.395C3.07001 15.789 3.30401 16.193 3.77401 17C4.24401 17.807 4.47801 18.21 4.79601 18.453C5.22001 18.776 5.75601 18.918 6.28601 18.849C6.52801 18.817 6.77301 18.719 7.11101 18.541C7.35374 18.4092 7.62583 18.3408 7.90204 18.3422C8.17825 18.3436 8.44963 18.4147 8.69101 18.549C9.17701 18.829 9.46501 19.344 9.48601 19.902C9.50101 20.282 9.53701 20.542 9.63101 20.765C9.83501 21.255 10.227 21.645 10.721 21.848C11.091 22 11.561 22 12.5 22C13.439 22 13.909 22 14.279 21.848C14.5231 21.7483 14.7451 21.6012 14.9322 21.4154C15.1192 21.2295 15.2677 21.0085 15.369 20.765C15.463 20.542 15.499 20.282 15.514 19.902C15.534 19.344 15.823 18.828 16.31 18.549C16.5513 18.4149 16.8225 18.3439 17.0985 18.3425C17.3745 18.3411 17.6464 18.4093 17.889 18.541C18.227 18.719 18.472 18.817 18.714 18.849C19.244 18.919 19.78 18.776 20.204 18.453C20.522 18.211 20.757 17.807 21.226 17C21.696 16.193 21.93 15.79 21.983 15.395C22.0168 15.1343 21.9989 14.8695 21.9303 14.6157C21.8616 14.3619 21.7436 14.1241 21.583 13.916C21.435 13.724 21.226 13.563 20.903 13.361C20.426 13.064 20.12 12.558 20.12 12C20.12 11.442 20.426 10.936 20.902 10.64C21.226 10.437 21.435 10.276 21.584 10.084C21.7444 9.87579 21.8623 9.63799 21.9307 9.38422C21.9992 9.13044 22.017 8.86565 21.983 8.605C21.93 8.211 21.696 7.807 21.226 7C20.756 6.193 20.522 5.79 20.204 5.547C19.7787 5.2242 19.2434 5.08192 18.714 5.151C18.472 5.183 18.227 5.281 17.889 5.459C17.6463 5.59083 17.3742 5.65922 17.098 5.65782C16.8218 5.65642 16.5504 5.58528 16.309 5.451C16.0727 5.3113 15.8758 5.11385 15.7367 4.87719C15.5977 4.64052 15.521 4.37241 15.514 4.098C15.499 3.718 15.463 3.458 15.369 3.235C15.2677 2.99154 15.1192 2.77051 14.9322 2.58465C14.7451 2.39878 14.5231 2.25175 14.279 2.152ZM12.5 15C14.17 15 15.523 13.657 15.523 12C15.523 10.343 14.169 9 12.5 9C10.831 9 9.47701 10.343 9.47701 12C9.47701 13.657 10.831 15 12.5 15Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowRightIcon = ({ size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 17L15 12L10 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
