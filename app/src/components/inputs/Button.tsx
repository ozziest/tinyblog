const Button = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className=" bg-neutral-900 text-white font-semibold px-4 py-3 rounded"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
