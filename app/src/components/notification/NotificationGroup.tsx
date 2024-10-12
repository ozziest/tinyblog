import { NotificationTypes } from "@/enums";
import { INotificationApi } from "@/types/ApiTypes";
import LikeNotification from "./LikeNotification";
import PostArticle from "../posts/PostArticle";
import PostAuthor from "../posts/PostAuthor";
import PostContent from "../posts/PostContent";
import PostActions from "../posts/PostActions";
import { useDashboardStore } from "@/stores/postStore";
import { extendPost } from "@/helpers/posts";

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
  const store = useDashboardStore();

  const Explanation = NOTIFICATION_MAP[notification.type];

  const post = extendPost(notification.post);

  return (
    <div className="flex flex-col gap-1">
      <Explanation notification={notification} />
      <PostArticle store={store} post={post} autoView={false} showBorder>
        <PostAuthor post={post} />
        <PostContent post={post} />
        <PostActions store={store} post={post} />
      </PostArticle>
    </div>
  );
};

export default NotificationGroup;
