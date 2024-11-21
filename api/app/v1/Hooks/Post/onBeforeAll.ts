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
      query.whereIn("posts.user_id", [
        ...followingIds,
        req.original.auth.userId,
      ]);
    }
  } else {
    // We shouldn't show the following posts;
    //  - if the author of the post has a private account
    //  - if the author of parent post has a private account
    //  - if the author of reshared post has a private account
    query
      .innerJoin("users", "users.id", "posts.user_id")
      .leftJoin("posts AS parent_posts", "parent_posts.id", "posts.parent_id")
      .leftJoin(
        "users AS parent_users",
        "parent_users.id",
        "parent_posts.user_id"
      )
      .leftJoin(
        "posts AS reshare_posts",
        "reshare_posts.id",
        "posts.reshare_id"
      )
      .leftJoin(
        "users AS reshare_users",
        "reshare_users.id",
        "reshare_posts.user_id"
      )
      .where("users.account_visibility", "public")
      .where((sub) => {
        sub
          .whereNull("parent_users.id")
          .orWhere("parent_users.account_visibility", "public");
      })
      .where((sub) => {
        sub
          .whereNull("reshare_users.id")
          .orWhere("reshare_users.account_visibility", "public");
      });
  }

  const tagId = req.query.get("tagId");
  if (tagId) {
    query.innerJoin("post_hashtags", "post_hashtags.post_id", "posts.id");
    query.innerJoin("hashtags", "hashtags.id", "post_hashtags.hashtag_id");
    query.where("hashtags.id", tagId);
  }
};
