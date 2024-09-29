import { IAfterShowContext } from "axe-api";

export default async ({ database, item, req }: IAfterShowContext) => {
  const postId = item.id;
  const userId = req.original.auth?.userId;

  // Check the post view
  const postView = await database
    .table("post_views")
    .where("user_id", userId)
    .where("post_id", postId)
    .first();

  // We should add the view if there is not any post view
  if (!postView) {
    await database.table("post_views").insert({
      user_id: userId,
      post_id: postId,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
};
