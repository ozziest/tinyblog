import { IAfterInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";
import PostService from "../../Services/PostService";

export default async ({ item }: IAfterInsertContext) => {
  try {
    await PostService.incrementPostView(item.post_id);
  } catch (error) {
    captureError(error, { postId: item.post_id });
  }
};
