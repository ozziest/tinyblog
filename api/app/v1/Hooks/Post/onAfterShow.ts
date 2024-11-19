import { IAfterShowContext } from "axe-api";
import PostService from "../../Services/PostService";
import LinkService from "../../Services/LinkService";

export default async ({ req, item }: IAfterShowContext) => {
  // Who am I?
  const userId = req.original.auth?.userId;

  if (userId) {
    // Which posts should I check?
    // Which posts should I check?
    const postIds = [item.id, item.parent?.id, item.reshare?.id].filter(
      (id) => id
    );

    // The posts that I liked
    const myLikedPostIds = await PostService.getMyLikedPostIds(userId, postIds);

    // The post ids that I already shared
    const mySharedPostIds = await PostService.getMySharedPostIds(
      userId,
      postIds
    );

    // Set the like status for the pot
    item.is_liked_by_you = myLikedPostIds.includes(item.id);

    // Check if the post is already shared by yourself
    item.is_shared_by_you = mySharedPostIds.includes(item.id);

    // Set the like status for the parent if there is any
    if (item.parent) {
      item.parent.is_liked_by_you = myLikedPostIds.includes(item.parent.id);
      item.parent.is_shared_by_you = mySharedPostIds.includes(item.parent.id);
      item.parent.links = LinkService.mapLinks(item.parent?.links);
    }

    if (item.reshare) {
      item.reshare.is_liked_by_you = myLikedPostIds.includes(item.reshare.id);
      item.reshare.is_shared_by_you = mySharedPostIds.includes(item.reshare.id);
      item.reshare.links = LinkService.mapLinks(item.reshare?.links);
    }

    item.links = LinkService.mapLinks(item?.links);
  }
};
