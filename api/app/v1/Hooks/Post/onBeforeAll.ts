import { IBeforeAllContext } from "axe-api";
import FollowerService from "../../Services/FollowerService";
import { FEED_ITEMS_PER_PAGE } from "../../../consts";

export default async ({ query, req, res }: IBeforeAllContext) => {
  // Clients can not fetch all items. We have to apply a limit all the time.
  // But we can not allow clients decide the limit via frontend queries due to
  // performance concern.
  query.limit(FEED_ITEMS_PER_PAGE);

  if (req.original.auth) {
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
  }

  const tagId = req.query.get("tagId");
  if (tagId) {
    query.innerJoin("post_hashtags", "post_hashtags.post_id", "posts.id");
    query.innerJoin("hashtags", "hashtags.id", "post_hashtags.hashtag_id");
    query.where("hashtags.id", tagId);
  }
};
