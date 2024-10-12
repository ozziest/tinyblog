import { INotificationApi } from "@/types/ApiTypes";
import NotificationNames from "./NotificationNames";

interface Props {
  notification: INotificationApi;
}

const LikeNotification = ({ notification }: Props) => {
  return (
    <div>
      <NotificationNames notification={notification} /> likes your post.
    </div>
  );
};

export default LikeNotification;
