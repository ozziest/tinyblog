import { NotificationTypes } from "@/enums";
import { INotificationApi } from "@/types/ApiTypes";
import PostBasedNotification, {
  PostBasedNotificationProps,
} from "./PostBasedNotification";
import { extendPost } from "@/helpers/posts";
import { LikeIcon } from "../Icons";
import { useNavigate } from "react-router-dom";

interface Props {
  notification: INotificationApi;
}

type NotificationIconType = ({ size }: { size: number }) => JSX.Element;
type NotificationDetailType = (
  props: PostBasedNotificationProps,
) => JSX.Element;

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
  [NotificationTypes.Like]: PostBasedNotification,
  [NotificationTypes.Reshare]: PostBasedNotification,
  [NotificationTypes.Follow]: PostBasedNotification,
  [NotificationTypes.Reply]: PostBasedNotification,
  [NotificationTypes.Mention]: PostBasedNotification,
};

const NOTIFICATION_MESSAGES: Record<NotificationTypes, string> = {
  [NotificationTypes.Like]: "liked your post.",
  [NotificationTypes.Reshare]: "reshared your post.",
  [NotificationTypes.Follow]: "started following you.",
  [NotificationTypes.Reply]: "replied to your post.",
  [NotificationTypes.Mention]: "mentioned you in a post.",
};

const NotificationGroup = ({ notification }: Props) => {
  const navigate = useNavigate();
  const NotificationIcon = NOTIFICATION_ICON_MAP[notification.type];
  const NotificationDetail = NOTIFICATION_TYPES_MAP[notification.type];
  const message = NOTIFICATION_MESSAGES[notification.type];

  const post = notification?.post ? extendPost(notification.post) : null;

  const handleClick = () => {
    if (post) {
      navigate(`/${post.id}`);
    }
  };

  const handleMoreUsersClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("handleMoreUsersClick", notification);
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
        <NotificationDetail
          notification={notification}
          message={message}
          handleMoreUsersClick={handleMoreUsersClick}
        />
      </div>
    </article>
  );
};

export default NotificationGroup;
