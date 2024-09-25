import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 border-b border-neutral-100 z-10 bg-white">
      <Link
        to="/"
        className="block max-w-screen-lg mx-auto text-xl font-bold py-2 text-neutral-800 hover:text-neutral-950"
      >
        tinyblog.space
      </Link>
    </div>
  );
};

export default Header;
