import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="my-10 text-center text-neutral-600 text-xs">
      <p className="py-2">
        By using this website, you agree to the{" "}
        <Link to="/terms" className="text-neutral-950">
          Terms of service
        </Link>{" "}
        and{" "}
        <Link to="/privacy-policy" className="text-neutral-950">
          Privacy Policy
        </Link>
        , including{" "}
        <Link to="/cookie-policy" className="text-neutral-950">
          Cookie Policy
        </Link>
        .
      </p>
      <p>© 2024 tinyblog.space</p>
    </footer>
  );
};

export default Footer;
