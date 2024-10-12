import { IBeforeInsertContext } from "axe-api";
import PostService from "../../Services/PostService";
import NotificationService from "../../Services/NotificationService";

export default async ({ req, formData, res }: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;

  // Check if the user already likes the post
  const item = await PostService.getPostLike(
    formData.user_id,
    formData.post_id
  );

  // Users should be able to like only once
  if (item) {
    // We should delete the old like
    await PostService.deletePostLike(item.id);

    // We should dec the post like stats
    await PostService.decrementPostLike(item.post_id);

    // We should clear notification if there is any
    await NotificationService.unlike(formData.user_id, item.post_id);

    return res.status(201).json({ isAlreadyLiked: true });
  }
};
