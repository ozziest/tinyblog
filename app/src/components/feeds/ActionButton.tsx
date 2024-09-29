import classNames from "classnames";

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
        className={classNames(
          "px-3 py-1 rounded-full text-neutral-600 group-hover:bg-neutral-800 group-hover:text-neutral-50",
          {
            "bg-neutral-700 text-white": isSelected,
            "bg-neutral-200": !isSelected,
          },
        )}
      >
        {icon}
      </span>
      {count}
    </button>
  );
};
export default ActionButton;
