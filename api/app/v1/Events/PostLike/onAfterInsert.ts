import { IAfterInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";
import PostService from "../../Services/PostService";
import NotificationService from "../../Services/NotificationService";

export default async ({ req, item }: IAfterInsertContext) => {
  try {
    await PostService.incrementPostLike(item.post_id);

    const userId = req.original.auth?.userId;
    if (userId) {
      await NotificationService.like(userId, item.post_id);
    }
  } catch (error) {
    captureError(error, { postId: item.post_id });
  }
};
