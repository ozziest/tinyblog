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
        "font-medium text-left rounded text-neutral-600 transition-colors hover:underline hover:text-neutral-900",
      )}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
