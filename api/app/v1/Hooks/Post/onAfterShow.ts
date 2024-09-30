import { IAfterShowContext } from "axe-api";
import PostService from "../../Services/PostService";

export default async ({ req, item }: IAfterShowContext) => {
  // Who am I?
  const userId = req.original.auth?.userId;

  if (userId) {
    // Which posts should I check?
    const postIds = [item.id, item.parent_id || -1];

    // The posts that I liked
    const myLikedPostIds = await PostService.getMyLikedPostIds(userId, postIds);

    // Set the like status for the pot
    item.is_liked_by_you = myLikedPostIds.includes(item.id);

    // Set the like status for the parent if there is any
    if (item.parent) {
      item.parent.is_liked_by_you = myLikedPostIds.includes(item.parent.id);
    }
  }
};
