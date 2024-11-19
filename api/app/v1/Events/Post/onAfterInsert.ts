import { IAfterInsertContext } from "axe-api";
import { captureError } from "../../Services/ErrorService";
import UserService from "../../Services/UserService";
import PostService from "../../Services/PostService";
import NotificationService from "../../Services/NotificationService";

export default async ({ item, req }: IAfterInsertContext) => {
  try {
    // Add hashtags to db
    if (req.original.post?.hashtags) {
      await PostService.addHashtags(item.id, req.original.post.hashtags);
    }

    if (req.original.post?.mentions) {
      await PostService.addMentions(item.id, req.original.post.mentions);
    }

    if (req.original.post?.links) {
      await PostService.addLinks(item.id, req.original.post.links);
    }

    // Upgrading the user's post count
    await UserService.incrementUserPostCount(item.user_id);

    let notifiedUserIds: number[] = [];

    // If the new post a reply to another post
    if (item.parent_id) {
      // We should update the parent post's status
      await PostService.incrementPostReplies(item.parent_id);

      // We should create a notification
      const ids = await NotificationService.reply(
        item.user_id,
        item.parent_id,
        item.id
      );
      notifiedUserIds.push(...ids);
    }

    // Let's inform the mentioned users. But we shouldn't send a notification
    // to the user who is already notified because of replied.
    const targetUserIds: number[] = (req.original.post?.mentions || [])
      .filter((item) => !notifiedUserIds.includes(item.id || 0))
      .map((item) => item.id as number)
      .filter((id) => id);
    await NotificationService.mention(item.user_id, targetUserIds, item.id);
  } catch (error) {
    captureError(error, {
      postId: item.id,
      parentId: item.parent_id,
      userId: item.user_id,
    });
  }
};
