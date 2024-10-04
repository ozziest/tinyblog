import { IAfterInsertContext } from "axe-api";
import UserService from "../../Services/UserService";

export default async ({ req, item }: IAfterInsertContext) => {
  if (req.original.auth) {
    await UserService.incrementFollowingCount(req.original.auth.userId);
  }

  await UserService.incrementFollowerCount(item.user_id);
};
