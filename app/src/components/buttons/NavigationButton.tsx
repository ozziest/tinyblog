import classNames from "classnames";

interface Props {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavigationButton = ({ icon, isActive, onClick, children }: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        "font-medium text-sm text-left rounded p-4 text-neutral-800 transition-colors hover:bg-indigo-50/50 flex items-center gap-2",
        {
          "bg-indigo-50 text-black font-semibold": isActive,
        },
      )}
      onClick={onClick}
    >
      <div className="min-w-8 flex justify-center items-center">{icon}</div>
      <div>{children}</div>
    </button>
  );
};

export default NavigationButton;
