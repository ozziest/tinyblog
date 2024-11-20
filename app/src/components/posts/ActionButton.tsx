import classNames from "classnames";
import numbro from "numbro";

interface Props {
  icon: string | React.ReactNode;
  count: number;
  isSelected: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ActionButton = ({
  icon,
  count,
  isSelected,
  disabled,
  onClick,
}: Props) => {
  const formattedCount = numbro(count).format({ average: true });

  return (
    <button
      type="button"
      className={classNames(
        "flex gap-[6px] items-center text-sm hover:bg-neutral-700 hover:text-white rounded-full px-2 py-1 transition-all",
        {
          "text-neutral-900": isSelected,
          "text-neutral-300": !isSelected,
        },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{icon}</span>
      <span className="text-neutral-400 text-xs font-semibold">
        {formattedCount}
      </span>
    </button>
  );
};
export default ActionButton;
