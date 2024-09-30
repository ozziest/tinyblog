import { IBeforeInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";
import UserService from "../../Services/UserService";
import PostService from "../../Services/PostService";

export default async ({ item }: IBeforeInsertContext) => {
  try {
    // Upgrading the user's post count
    await UserService.incrementUserPostCount(item.user_id);

    // If the new post a reply to another post, we should update the parent
    // post's status
    if (item.parent_id) {
      await PostService.incrementPostReplies(item.parent_id);
    }
  } catch (error) {
    captureError(error, {
      postId: item.id,
      parentId: item.parent_id,
      userId: item.user_id,
    });
  }
};
