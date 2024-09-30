import { IAfterPaginateContext } from "axe-api";
import PostService from "../../Services/PostService";

export default async ({ req, result }: IAfterPaginateContext) => {
  // Who am I?
  const userId = req.original.auth?.userId;

  if (userId) {
    // Which posts should I check?
    const postIds = result.data.map((item: any) => item.id);

    // The posts that I liked
    const myLikedPostIds = await PostService.getMyLikedPostIds(userId, postIds);

    result.data.forEach((item: any) => {
      // Set the like status for the pot
      item.is_liked_by_you = myLikedPostIds.includes(item.id);

      // Set the like status for the parent if there is any
      if (item.parent) {
        item.parent.is_liked_by_you = myLikedPostIds.includes(item.parent.id);
      }
    });
  }
};
