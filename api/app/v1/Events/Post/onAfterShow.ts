import { IAfterShowContext } from "axe-api";

export default async ({ database, item, req }: IAfterShowContext) => {
  const userId = req.original.auth?.userId;

  if (!userId) {
    return;
  }

  const setAsViewed = async (postId: number) => {
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

  await setAsViewed(item.id);

  if (item.parent_id) {
    await setAsViewed(item.parent_id);
  }
};
