import classNames from "classnames";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
}

const NavigationLink = ({ to, children }: Props) => {
  return (
    <Link
      to={to}
      className={classNames(
        "font-medium text-sm text-left rounded p-4 text-neutral-800 transition-colors hover:bg-indigo-50/50 flex items-center gap-2",
      )}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
