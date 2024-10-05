import { IBeforePaginateContext } from "axe-api";

export default async ({ query, req, res }: IBeforePaginateContext) => {
  if (!req.original.auth) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // const followingIds = await FollowerService.getMyFollowingIds(
  //   req.original.auth.userId
  // );
  // query.whereIn("user_id", followingIds);
};
