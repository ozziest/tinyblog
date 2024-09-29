import { IAfterPaginateContext } from "axe-api";

export default async ({ req, result, database }: IAfterPaginateContext) => {
  // Who am I?
  const userId = req.original.auth?.userId;

  // Which posts should I check?
  const postIds = result.data.map((item: any) => item.id);

  // Fetch my related likes
  const myLikes = await database
    .table("post_likes")
    .select("post_id")
    .whereIn("post_id", postIds)
    .where("user_id", userId);

  // The posts that I liked
  const myLikedPostIds = myLikes.map((item) => item.post_id).flat();

  result.data.forEach((item: any) => {
    // Set the like status for the pot
    item.is_liked_by_you = myLikedPostIds.includes(item.id);

    // Set the like status for the parent if there is any
    if (item.parent) {
      item.parent.is_liked_by_you = myLikedPostIds.includes(item.parent.id);
    }
  });
};
