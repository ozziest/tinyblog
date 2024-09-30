import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { getUserAvatar } from "../Services/UserService";
import { validate } from "robust-validator";
import PostService from "../Services/PostService";

export default async (req: AxeRequest, res: AxeResponse) => {
  const db = (await IoCService.use("Database")) as Knex;

  const { postId } = req.params;
  const userId = req.original.auth?.userId;

  if (!userId) {
    return res.status(404).json({ error: "The user not found!" });
  }

  const validation = await validate(
    { postId, userId },
    {
      postId: "required|numeric",
      userId: "required|numeric",
    }
  );

  if (validation.isInvalid) {
    return res.status(400).json(validation);
  }

  const post = await PostService.getPost(postId);
  if (!post) {
    return res.status(404).json({ error: "The post not found!" });
  }

  await PostService.share(postId, userId);

  return res.status(201).json({});
};
