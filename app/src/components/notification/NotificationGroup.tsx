import { NotificationTypes } from "@/enums";
import { INotificationApi } from "@/types/ApiTypes";
import LikeNotification from "./LikeNotification";
import { extendPost } from "@/helpers/posts";
import { LikeIcon } from "../Icons";
import { useNavigate } from "react-router-dom";

interface Props {
  notification: INotificationApi;
}

type NotificationIconType = ({ size }: { size: number }) => JSX.Element;
type NotificationDetailType = ({ notification }: Props) => JSX.Element;

const NOTIFICATION_ICON_MAP: Record<NotificationTypes, NotificationIconType> = {
  [NotificationTypes.Like]: LikeIcon,
  [NotificationTypes.Reshare]: LikeIcon,
  [NotificationTypes.Follow]: LikeIcon,
  [NotificationTypes.Reply]: LikeIcon,
  [NotificationTypes.Mention]: LikeIcon,
};

const NOTIFICATION_TYPES_MAP: Record<
  NotificationTypes,
  NotificationDetailType
> = {
  [NotificationTypes.Like]: LikeNotification,
  [NotificationTypes.Reshare]: LikeNotification,
  [NotificationTypes.Follow]: LikeNotification,
  [NotificationTypes.Reply]: LikeNotification,
  [NotificationTypes.Mention]: LikeNotification,
};

const NotificationGroup = ({ notification }: Props) => {
  const navigate = useNavigate();
  const NotificationIcon = NOTIFICATION_ICON_MAP[notification.type];
  const NotificationDetail = NOTIFICATION_TYPES_MAP[notification.type];

  const post = extendPost(notification.post);

  const handleClick = () => {
    navigate(`/${post.id}`);
  };

  return (
    <article
      className="flex justify-between pt-5 cursor-pointer transition-all hover:bg-neutral-50"
      onClick={handleClick}
    >
      <div className="px-5 text-red-300">
        <NotificationIcon size={24} />
      </div>
      <div className="flex-grow pb-5">
        <NotificationDetail notification={notification} />
      </div>
    </article>
  );
};

export default NotificationGroup;
