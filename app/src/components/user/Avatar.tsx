import { IUserApi } from "@/types/ApiTypes";

export type AvatarSize = "sm" | "md" | "lg";

const SIZES: Record<AvatarSize, number> = {
  sm: 30,
  md: 50,
  lg: 80,
};

interface Props {
  user: IUserApi;
  size?: AvatarSize;
}

const Avatar = ({ user, size = "md" }: Props) => {
  const realSize = `${SIZES[size]}px`;
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
