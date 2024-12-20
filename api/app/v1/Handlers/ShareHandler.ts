import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { validate } from "robust-validator";
import PostService from "../Services/PostService";
import { captureError } from "../Services/ErrorService";
import NotificationService from "../Services/NotificationService";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
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

    if (post.user_id == userId) {
      return res.status(403).json({ error: "You can not reshare your post!" });
    }

    const isAlreadyShared = await PostService.isAlreadySharedByUser(
      postId,
      userId
    );

    if (isAlreadyShared) {
      return res.status(400).json({ error: "You already shared the post." });
    }

    await PostService.share(postId, userId, post.location);
    await PostService.incrementPostShare(postId);
    await NotificationService.reshare(userId, postId);
    return res.status(201).json({});
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
