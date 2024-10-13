import { INotificationApi } from "@/types/ApiTypes";
import UserLink from "./UserLink";
import XOthersButton from "./XOthersButton";

interface Props {
  notification: INotificationApi;
  handleMoreUsersClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const NotificationNames = ({ notification, handleMoreUsersClick }: Props) => {
  if (notification.triggers.length === 1) {
    const [trigger] = notification.triggers;
    return <UserLink user={trigger.user} />;
  }

  const [first, second] = notification.triggers;
  const extraUserCount = notification.count - 2;

  return (
    <div className="flex pr-1">
      <UserLink user={first.user} />
      {extraUserCount > 0 && <span className="pr-1">,</span>}
      {extraUserCount === 0 && <span className="pr-1">and</span>}
      <UserLink user={second.user} />
      {extraUserCount > 0 && (
        <div className="pl-1">
          and{" "}
          <XOthersButton
            count={extraUserCount}
            handleClick={handleMoreUsersClick}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationNames;
