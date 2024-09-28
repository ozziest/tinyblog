import { IUserApi } from "../../types/ApiTypes";

interface Props {
  user: IUserApi;
  size?: number;
}

const Avatar = ({ user, size = 12 }: Props) => {
  const realSize = `${size * 4}px`;
  return (
    <img
      className={`rounded-full shadow`}
      style={{
        minWidth: realSize,
        minHeight: realSize,
        width: realSize,
        height: realSize,
      }}
      src={user.avatar}
    />
  );
};

export default Avatar;
