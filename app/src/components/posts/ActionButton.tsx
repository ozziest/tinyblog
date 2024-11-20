import useAuthStore from "@/stores/authStore";
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
  const authStore = useAuthStore();
  const isLoggedIn = authStore.state.isLoggedIn;
  const formattedCount = numbro(count).format({ average: true });

  return (
    <button
      type="button"
      className={classNames(
        "flex gap-[6px] items-center text-sm rounded-full px-2 py-1 transition-all",
        {
          "text-neutral-900": isSelected,
          "text-neutral-300": !isSelected,
        },
        {
          "hover:bg-neutral-700 hover:text-white": isLoggedIn,
        },
      )}
      onClick={onClick}
      disabled={disabled || !isLoggedIn}
    >
      <span>{icon}</span>
      <span className="text-neutral-400 text-xs font-semibold">
        {formattedCount}
      </span>
    </button>
  );
};
export default ActionButton;
