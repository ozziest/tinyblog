import { INotificationApi } from "@/types/ApiTypes";
import UserLink from "./UserLink";
import AvatarLink from "../user/AvatarLink";
import XOthersAvatar from "./XOthersAvatar";

interface Props {
  notification: INotificationApi;
  handleMoreUsersClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const NotificationAvatars = ({ notification, handleMoreUsersClick }: Props) => {
  if (notification.triggers.length === 1) {
    const [trigger] = notification.triggers;
    return <UserLink user={trigger.user} />;
  }

  const [first, second] = notification.triggers;
  const extraUserCount = notification.count - 2;

  return (
    <div className="flex gap-1">
      <AvatarLink user={first.user} />
      <AvatarLink user={second.user} />
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
