import { INotificationApi, IUserApi } from "@/types/ApiTypes";
import { Link } from "react-router-dom";

interface Props {
  notification: INotificationApi;
}

const UserLink = ({ user }: { user: IUserApi }) => {
  return (
    <Link
      to={`/u/${user.username}`}
      className="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
      onClick={(event) => event.stopPropagation()}
    >
      {user.name}
    </Link>
  );
};

const NotificationNames = ({ notification }: Props) => {
  if (notification.triggers.length === 1) {
    const [trigger] = notification.triggers;

    return <UserLink user={trigger.user} />;
  }

  return (
    <div>
      {notification.triggers.map((trigger) => (
        <UserLink key={trigger.id} user={trigger.user} />
      ))}
    </div>
  );
};

export default NotificationNames;
