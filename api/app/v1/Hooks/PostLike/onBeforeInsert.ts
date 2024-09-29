import { IBeforeInsertContext } from "axe-api";

export default async ({
  req,
  formData,
  database,
  res,
}: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;

  // Check if the user already likes the post
  const item = await database
    .table("post_likes")
    .where("user_id", formData.user_id)
    .where("post_id", formData.post_id)
    .first();

  // Users should be able to like only once
  if (item) {
    return res.status(201).json({ isAlreadyLiked: true });
  }
};
