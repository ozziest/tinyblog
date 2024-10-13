import { NotificationTypes } from "@/enums";
import { INotificationApi } from "@/types/ApiTypes";
import PostBasedNotification, {
  PostBasedNotificationProps,
} from "./PostBasedNotification";
import { extendPost } from "@/helpers/posts";
import { LikeIcon, ReplyIcon, ShareIcon } from "../Icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";
import api from "@/api";

interface Props {
  notification: INotificationApi;
}

type NotificationIconType = ({ size }: { size: number }) => JSX.Element;
type NotificationDetailType = (
  props: PostBasedNotificationProps,
) => JSX.Element;

const NOTIFICATION_ICON_MAP: Record<NotificationTypes, NotificationIconType> = {
  [NotificationTypes.Like]: LikeIcon,
  [NotificationTypes.Reshare]: ShareIcon,
  [NotificationTypes.Follow]: LikeIcon,
  [NotificationTypes.Reply]: ReplyIcon,
  [NotificationTypes.Mention]: LikeIcon,
};

const NOTIFICATION_ICON_COLORS: Record<NotificationTypes, string> = {
  [NotificationTypes.Like]: "text-red-300",
  [NotificationTypes.Reshare]: "text-green-500",
  [NotificationTypes.Follow]: "text-indigo-500",
  [NotificationTypes.Reply]: "text-blue-500",
  [NotificationTypes.Mention]: "text-purple-500",
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
  const [isRead, setRead] = useState(notification.is_read);
  const NotificationIcon = NOTIFICATION_ICON_MAP[notification.type];
  const NotificationDetail = NOTIFICATION_TYPES_MAP[notification.type];
  const message = NOTIFICATION_MESSAGES[notification.type];
  const iconColor = NOTIFICATION_ICON_COLORS[notification.type];

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

  const hadleMouseEnter = async () => {
    // We don't need to set a timer
    if (isRead === 1) {
      return;
    }

    await api.notifications.setAsRead(notification.id);
    setRead(1);
  };

  return (
    <article
      className={classNames(
        "flex justify-between pt-5 cursor-pointer transition-all hover:bg-neutral-50",
        { "bg-indigo-50": isRead === 0 },
      )}
      onClick={handleClick}
      onMouseEnter={hadleMouseEnter}
    >
      <div className={classNames("px-5", iconColor)}>
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
