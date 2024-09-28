interface Props {
  children: React.ReactNode;
}

const ErrorText = ({ children }: Props) => {
  return <div className="text-red-500 text-sm font-semibold">{children}</div>;
};

export default ErrorText;
