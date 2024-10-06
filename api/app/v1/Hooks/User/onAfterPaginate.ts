import { IAfterPaginateContext } from "axe-api";
import FollowerService from "../../Services/FollowerService";

export default async ({ result, req }: IAfterPaginateContext) => {
  if (req.original.auth) {
    const followings = await FollowerService.getMyFollowings(
      req.original.auth?.userId
    );

    result.data.map((item: any) => {
      const following = followings.find((i: any) => i.user_id === item.id);
      if (following) {
        item.following_id = following.id;
      }
    });
  }
};
