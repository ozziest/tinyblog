import classNames from "classnames";

interface Props {
  icon: string | React.ReactNode;
  count: number;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ActionButton = ({ icon, count, isSelected, onClick }: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        "flex gap-[6px] items-center text-sm hover:bg-neutral-700 hover:text-white rounded-full px-2 py-1 transition-all",
        {
          "text-neutral-900": isSelected,
          "text-neutral-200": !isSelected,
        },
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="text-neutral-300 text-xs font-semibold">{count}</span>
    </button>
  );
};
export default ActionButton;
