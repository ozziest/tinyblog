import { Link } from "react-router-dom";
import { LogoIcon } from "../Icons";

const Header = () => {
  return (
    <div className="sticky top-0 border-b border-neutral-100 z-50 bg-white">
      <div className="block max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <div className="text-indigo-800 -ml-[8px]">
            <LogoIcon size={48} />
          </div>
          <Link
            to="/"
            className="text-xl font-bold py-2 text-neutral-700 hover:text-neutral-950"
          >
            tinyblog.space
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
