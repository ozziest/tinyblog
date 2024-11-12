import { IBeforeInsertContext } from "axe-api";
import PostService from "../../Services/PostService";

export default async ({ req, res, formData }: IBeforeInsertContext) => {
  formData.user_id = req.original.auth?.userId;

  req.original.post = await PostService.toPostContent(formData.content);
  formData.content = req.original.post.content;

  // If there is a parentId, the answer should use the parent's location
  if (formData.parent_id) {
    const parentPost = await PostService.getPost(formData.parent_id);
    formData.location = parentPost.location;
  }
};
