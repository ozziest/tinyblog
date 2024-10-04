import classNames from "classnames";

type ButtonType = "primary" | "secondary";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isBlock?: boolean;
  variant?: ButtonType;
}

const STYLES: Record<ButtonType, string> = {
  primary: "bg-neutral-800 text-white hover:bg-neutral-900",
  secondary: "text-neutral-900 bg-neutral-100 hover:bg-neutral-300",
};

const Button = ({ variant = "primary", children, isBlock, ...rest }: Props) => {
  return (
    <button
      className={classNames(
        "transition-colors font-semibold px-4 py-2 rounded ",
        {
          [STYLES[variant]]: true,
          "w-full": isBlock,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
