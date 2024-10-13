import { INotificationApi } from "@/types/ApiTypes";
import NotificationNames from "./NotificationNames";
import FormatPostToJSX from "../posts/FormatPostToJSX";
import { extendPost } from "@/helpers/posts";
import NotificationAvatars from "./NotificationAvatars";

interface Props {
  notification: INotificationApi;
}

const LikeNotification = ({ notification }: Props) => {
  const post = extendPost(notification.post);

  const handleMoreUsersClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("handleMoreUsersClick", notification);
  };

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
        <span>liked your post.</span>
      </div>
      <div className="opacity-50 pt-3">
        <FormatPostToJSX data={post} />
      </div>
    </div>
  );
};

export default LikeNotification;
