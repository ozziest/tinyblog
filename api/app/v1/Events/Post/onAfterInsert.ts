import { IBeforeInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";

export default async ({ database, item }: IBeforeInsertContext) => {
  try {
    // Upgrading the user's post count
    await database
      .table("users")
      .where("id", item.user_id)
      .increment({ stats_post: 1 });

    // If the new post a reply to another post, we should update the parent
    // post's status
    if (item.parent_id) {
      await database
        .table("posts")
        .where("id", item.parent_id)
        .increment({ stats_replies: 1 });
    }
  } catch (error) {
    captureError(error, {
      postId: item.id,
      parentId: item.parent_id,
      userId: item.user_id,
    });
  }
};
