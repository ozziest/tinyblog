import { IBeforeInsertContext } from "axe-api";

export default async ({
  req,
  formData,
  database,
  res,
}: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;

  // Check if the user already viewed the post
  const item = await database
    .table("post_views")
    .where("user_id", formData.user_id)
    .where("post_id", formData.post_id)
    .first();

  // If so, we shouldn't allow to create another view record to prevent abuse
  if (item) {
    return res.status(201).json({ isAlreadyViewed: true });
  }
};
