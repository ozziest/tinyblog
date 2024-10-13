import { INotificationApi } from "@/types/ApiTypes";
import NotificationNames from "./NotificationNames";
import FormatPostToJSX from "../posts/FormatPostToJSX";
import NotificationAvatars from "./NotificationAvatars";
import classNames from "classnames";
import { ExtendedPost } from "@/stores/postStore";

export interface PostBasedNotificationProps {
  notification: INotificationApi;
  post?: ExtendedPost | null;
  message: string;
  handleMoreUsersClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PostBasedNotification = ({
  notification,
  message,
  post,
  handleMoreUsersClick,
}: PostBasedNotificationProps) => {
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
        <div
          className={classNames("pt-3", { "opacity-40": !notification.reply })}
        >
          <FormatPostToJSX data={post} />
        </div>
      )}
    </div>
  );
};

export default PostBasedNotification;
