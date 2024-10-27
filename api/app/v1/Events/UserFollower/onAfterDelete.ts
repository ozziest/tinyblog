import { IAfterDeleteContext } from "axe-api";
import UserService from "../../Services/UserService";
import NotificationService from "../../Services/NotificationService";
import { NotificationTypes } from "../../../enums";

export default async ({ req, res, item }: IAfterDeleteContext) => {
  if (!req.original.auth) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { userId: triggerUserId } = req.original.auth;
  const { user_id: targetUserId } = item;

  await UserService.decrementFollowingCount(triggerUserId);

  await UserService.decrementFollowerCount(targetUserId);

  await NotificationService.remove(NotificationTypes.Follow, triggerUserId);
};
