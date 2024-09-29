import { IAfterShowContext } from "axe-api";

export default async ({ req, item, database }: IAfterShowContext) => {
  // Who am I?
  const userId = req.original.auth?.userId;

  // Which posts should I check?
  const postIds = [item.id, item.parent_id || -1];

  // Fetch my related likes
  const myLikes = await database
    .table("post_likes")
    .select("post_id")
    .whereIn("post_id", postIds)
    .where("user_id", userId);

  // The posts that I liked
  const myLikedPostIds = myLikes.map((item) => item.post_id).flat();

  // Set the like status for the pot
  item.is_liked_by_you = myLikedPostIds.includes(item.id);

  // Set the like status for the parent if there is any
  if (item.parent) {
    item.parent.is_liked_by_you = myLikedPostIds.includes(item.parent.id);
  }
};
