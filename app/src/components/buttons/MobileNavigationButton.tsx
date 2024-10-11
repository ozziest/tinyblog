import classNames from "classnames";

interface Props {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavigationButton = ({ icon, isActive, onClick }: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        "w-full font-medium text-sm text-left rounded p-5 text-neutral-800 transition-colors flex justify-center items-center gap-2",
        {
          "bg-indigo-100 text-black font-semibold": isActive,
        },
      )}
      onClick={onClick}
    >
      <div className="min-w-8">{icon}</div>
    </button>
  );
};

export default MobileNavigationButton;
