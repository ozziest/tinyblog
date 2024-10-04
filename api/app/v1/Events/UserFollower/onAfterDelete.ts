import { IAfterDeleteContext } from "axe-api";
import UserService from "../../Services/UserService";

export default async ({ req, item }: IAfterDeleteContext) => {
  if (req.original.auth) {
    await UserService.decrementFollowingCount(req.original.auth.userId);
  }

  await UserService.decrementFollowerCount(item.user_id);
};
