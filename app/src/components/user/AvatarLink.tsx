import { IUserApi } from "@/types/ApiTypes";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

interface Props {
  user: IUserApi;
}

const AvatarLink = ({ user }: Props) => {
  return (
    <Link
      to={`/u/${user.username}`}
      onClick={(event) => event.stopPropagation()}
      title={user.name}
    >
      <Avatar user={user} size={9} />
    </Link>
  );
};

export default AvatarLink;
