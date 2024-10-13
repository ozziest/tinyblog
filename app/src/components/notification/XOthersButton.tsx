interface Props {
  count: number;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const XOthersButton = ({ count, handleClick }: Props) => {
  return (
    <button
      type="button"
      className="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
      onClick={handleClick}
    >
      {count} others
    </button>
  );
};
export default XOthersButton;
