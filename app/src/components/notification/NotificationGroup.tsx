import { NotificationTypes } from "@/enums";
import { INotificationApi } from "@/types/ApiTypes";
import LikeNotification from "./LikeNotification";
import { extendPost } from "@/helpers/posts";
import { LikeIcon } from "../Icons";
import FormatPostToJSX from "../posts/FormatPostToJSX";
import { useNavigate } from "react-router-dom";

interface Props {
  notification: INotificationApi;
}

type CustomNotificationType = ({ notification }: Props) => JSX.Element;

const NOTIFICATION_MAP: Record<NotificationTypes, CustomNotificationType> = {
  [NotificationTypes.Like]: LikeNotification,
  [NotificationTypes.Reshare]: LikeNotification,
  [NotificationTypes.Follow]: LikeNotification,
  [NotificationTypes.Reply]: LikeNotification,
  [NotificationTypes.Mention]: LikeNotification,
};

const NotificationGroup = ({ notification }: Props) => {
  const navigate = useNavigate();
  const Explanation = NOTIFICATION_MAP[notification.type];

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
        <LikeIcon size={28} />
      </div>
      <div className="flex-grow flex flex-col gap-1 pb-5">
        <Explanation notification={notification} />
        <div className="opacity-50">
          <FormatPostToJSX data={post} />
        </div>
      </div>
    </article>
  );
};

export default NotificationGroup;
