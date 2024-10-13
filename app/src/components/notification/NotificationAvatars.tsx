import { INotificationApi } from "@/types/ApiTypes";
import AvatarLink from "../user/AvatarLink";
import XOthersAvatar from "./XOthersAvatar";

interface Props {
  notification: INotificationApi;
  handleMoreUsersClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const NotificationAvatars = ({ notification, handleMoreUsersClick }: Props) => {
  const [first, second] = notification.triggers;
  const extraUserCount = notification.count - 2;

  return (
    <div className="flex gap-1">
      <AvatarLink user={first.user} />
      {second && <AvatarLink user={second.user} />}
      {extraUserCount > 0 && (
        <div>
          <XOthersAvatar
            count={extraUserCount}
            handleClick={handleMoreUsersClick}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default NotificationAvatars;
