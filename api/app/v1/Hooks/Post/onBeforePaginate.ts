import { IBeforePaginateContext } from "axe-api";
import FollowerService from "../../Services/FollowerService";

export default async ({
  query,
  req,
  res,
  database,
}: IBeforePaginateContext) => {
  if (!req.original.auth) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Check if the client wanted to see the feed
  const feed = req.query.get("feed");
  if (feed === "true") {
    // Who do I follow?
    const followingIds = await FollowerService.getMyFollowingIds(
      req.original.auth.userId
    );
    // Get me the only the posts of the people that I follow. But also, my posts
    query.whereIn("user_id", [...followingIds, req.original.auth.userId]);
  }
};
