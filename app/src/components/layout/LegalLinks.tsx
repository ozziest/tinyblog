import { Link } from "react-router-dom";

interface Props {
  classes?: string;
}

export const LegalLinks = ({ classes = "text-neutral-950" }: Props) => {
  return (
    <>
      <Link to="/terms" className={classes}>
        Terms of service
      </Link>{" "}
      |{" "}
      <Link to="/privacy-policy" className={classes}>
        Privacy Policy
      </Link>{" "}
      |{" "}
      <Link to="/cookie-policy" className={classes}>
        Cookie Policy
      </Link>
    </>
  );
};

export default LegalLinks;
