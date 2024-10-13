import { INotificationApi } from "@/types/ApiTypes";
import UserLink from "./UserLink";
import XOthersButton from "./XOthersButton";

interface Props {
  notification: INotificationApi;
}

const NotificationNames = ({ notification }: Props) => {
  if (notification.triggers.length === 1) {
    const [trigger] = notification.triggers;
    return <UserLink user={trigger.user} />;
  }

  const [first, second] = notification.triggers;
  const extraUserCount = notification.count - 2;

  return (
    <div className="flex">
      <UserLink user={first.user} />
      {extraUserCount > 0 && <span className="pr-1">,</span>}
      {extraUserCount === 0 && <span className="px-1">and</span>}
      <UserLink user={second.user} />
      {extraUserCount > 0 && (
        <div className="px-1">
          and{" "}
          <XOthersButton count={extraUserCount} notification={notification} />
        </div>
      )}
    </div>
  );
};

export default NotificationNames;
