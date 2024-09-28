interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isBlock?: boolean;
}

const Button = ({ children, isBlock, ...rest }: Props) => {
  return (
    <button
      className={`bg-neutral-900 text-white font-semibold px-4 py-2 rounded ${isBlock ? "w-full" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
