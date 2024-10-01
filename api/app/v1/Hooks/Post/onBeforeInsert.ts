import { IBeforeInsertContext } from "axe-api";
import PostService from "../../Services/PostService";

export default async ({ req, res, formData }: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;

  req.original.post = await PostService.toPostContent(formData.content);
  formData.content = req.original.post.content;

  // res.status(400).json({ ...req.original.post });
};
