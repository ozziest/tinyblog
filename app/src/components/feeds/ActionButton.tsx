interface Props {
  icon: string;
  count: number;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ActionButton = ({ icon, count, isSelected, onClick }: Props) => {
  return (
    <button
      type="button"
      className="flex gap-1 items-center text-sm text-neutral-400 group"
      onClick={onClick}
    >
      <span
        className={`${isSelected ? "bg-neutral-700" : "bg-neutral-200"} px-3 py-1 rounded-full text-neutral-600 group-hover:bg-neutral-800 group-hover:text-neutral-50`}
      >
        {icon}
      </span>
      {count}
    </button>
  );
};
export default ActionButton;
