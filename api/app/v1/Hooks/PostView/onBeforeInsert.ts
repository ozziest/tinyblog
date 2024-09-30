import { IBeforeInsertContext } from "axe-api";
import PostService from "../../Services/PostService";

export default async ({
  req,
  formData,
  database,
  res,
}: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;

  // Check if the user already viewed the post
  const item = await PostService.getPostView(
    formData.user_id,
    formData.post_id
  );

  // If so, we shouldn't allow to create another view record to prevent abuse
  if (item) {
    return res.status(201).json({ isAlreadyViewed: true });
  }
};
