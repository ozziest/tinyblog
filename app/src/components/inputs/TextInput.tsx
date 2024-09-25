interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = ({ label, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-semibold">{label}</label>}
      <input
        className="outline outline-neutral-500 rounded px-3 py-2"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
