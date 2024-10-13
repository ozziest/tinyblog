interface Props {
  count: number;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const XOthersAvatar = ({ count, handleClick }: Props) => {
  return (
    <button
      type="button"
      className="bg-neutral-200 h-9 w-9 min-h-9 min-w-9 rounded-full font-medium text-sm text-neutral-700 transition-all hover:bg-neutral-300"
      onClick={handleClick}
    >
      +{count}
    </button>
  );
};
export default XOthersAvatar;
