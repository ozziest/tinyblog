import { IBeforeInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";
import PostService from "../../Services/PostService";

export default async ({ item }: IBeforeInsertContext) => {
  try {
    await PostService.incrementPostLike(item.post_id);
  } catch (error) {
    captureError(error, { postId: item.post_id });
  }
};
