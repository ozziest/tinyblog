import { INotificationApi } from "@/types/ApiTypes";
import NotificationNames from "./NotificationNames";
import FormatPostToJSX from "../posts/FormatPostToJSX";
import { extendPost } from "@/helpers/posts";
import NotificationAvatars from "./NotificationAvatars";

export interface PostBasedNotificationProps {
  notification: INotificationApi;
  message: string;
  handleMoreUsersClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PostBasedNotification = ({
  notification,
  message,
  handleMoreUsersClick,
}: PostBasedNotificationProps) => {
  const post = notification?.post ? extendPost(notification.post) : null;

  return (
    <div>
      <div className="pb-3">
        <NotificationAvatars
          notification={notification}
          handleMoreUsersClick={handleMoreUsersClick}
        />
      </div>
      <div className="flex">
        <NotificationNames
          notification={notification}
          handleMoreUsersClick={handleMoreUsersClick}
        />
        <span className="px-1">{message}</span>
      </div>
      {post && (
        <div className="opacity-50 pt-3">
          <FormatPostToJSX data={post} />
        </div>
      )}
    </div>
  );
};

export default PostBasedNotification;
