import { IAfterShowContext } from "axe-api";
import PostService from "../../Services/PostService";

export default async ({ item, req }: IAfterShowContext) => {
  const userId = req.original.auth?.userId;

  if (!userId) {
    return;
  }

  const setAsViewed = async (postId: number) => {
    // Check the post view
    const postView = await PostService.getPostView(userId, postId);

    // We should add the view if there is not any post view
    if (!postView) {
      await PostService.addPostView(userId, postId);

      // Update the post's view count
      await PostService.incrementPostView(postId);
    }
  };

  await setAsViewed(item.id);

  if (item.parent_id) {
    await setAsViewed(item.parent_id);
  }
};
