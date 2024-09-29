import { IBeforeInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";

export default async ({ database, item }: IBeforeInsertContext) => {
  try {
    await database
      .table("posts")
      .where("id", item.post_id)
      .increment({ stats_likes: 1 });
  } catch (error) {
    captureError(error, { postId: item.post_id });
  }
};
