import { IAfterInsertContext } from "axe-api";
import UserService from "../../Services/UserService";
import NotificationService from "../../Services/NotificationService";

export default async ({ req, item }: IAfterInsertContext) => {
  if (!req.original.auth) {
    return;
  }

  const { userId: triggerUserId } = req.original.auth;
  const { user_id: targetUserId } = item;

  await UserService.incrementFollowingCount(triggerUserId);

  await UserService.incrementFollowerCount(targetUserId);

  await NotificationService.follow(triggerUserId, targetUserId);
};
