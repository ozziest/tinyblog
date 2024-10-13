import { IUserApi } from "@/types/ApiTypes";
import { Link } from "react-router-dom";

interface Props {
  user: IUserApi;
}

const UserLink = ({ user }: Props) => {
  const [firstName] = user.name.split(" ");

  return (
    <Link
      to={`/u/${user.username}`}
      className="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
      onClick={(event) => event.stopPropagation()}
    >
      {firstName}
    </Link>
  );
};

export default UserLink;
