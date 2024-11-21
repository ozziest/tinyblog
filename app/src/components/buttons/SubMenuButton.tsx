import classNames from "classnames";
import { ArrowRightIcon } from "../Icons";

interface IProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const SubMenuButton = ({ isActive, children, onClick }: IProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "w-full text-left border-b border-neutral-100 last:border-none pl-3 py-3 pr-1 flex gap-2 justify-between items-center font-semibold text-neutral-800 text-sm",
        {
          "bg-indigo-50": isActive,
        },
      )}
      onClick={onClick}
    >
      {children}
      <ArrowRightIcon size={18} />
    </button>
  );
};

export default SubMenuButton;
