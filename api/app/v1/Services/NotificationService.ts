import { Knex } from "knex";
import { IoCService } from "axe-api";
import { NotificationTypes } from "../../enums";
import PostService from "./PostService";
import { subHours } from "date-fns";

const getTargetUserIds = async (postId: number) => {
  const post = await PostService.getPost(postId);
  const mentions = await PostService.getMentions(postId);
  return [post.user_id, ...mentions.map((item) => item.user_id)];
};

const createNotification = async (
  type: NotificationTypes,
  targetUserId: number,
  sourceUserId: number,
  postId?: number
) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("notifications").insert({
    target_user_id: targetUserId,
    source_user_id: sourceUserId,
    type,
    post_id: postId,
    count: 1,
    is_read: false,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const createNotificationRepetition = async (
  notificationId: number,
  sourceUserId: number
) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("notifications_repetitions").insert({
    notification_id: notificationId,
    source_user_id: sourceUserId,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await db
    .table("notifications")
    .where("id", notificationId)
    .increment({ count: 1 });
};

const create = async (
  type: NotificationTypes,
  notification: any,
  targetUserId: number,
  sourceUserId: number,
  postId?: number
) => {
  if (notification) {
    return await createNotificationRepetition(notification.id, sourceUserId);
  }
  await createNotification(type, targetUserId, sourceUserId, postId);
};

const getPreviousNotificationByPost = async (
  targetUserId: number,
  postId: number
) => {
  const db = await IoCService.use<Knex>("Database");
  const sixHoursBefore = subHours(new Date(), 6);
  return await db
    .table("notifications")
    .where("target_user_id", targetUserId)
    .where("post_id", postId)
    .where("created_at", ">", sixHoursBefore)
    .first();
};

const like = async (sourceUserId: number, postId: number) => {
  const targetUserIds = await getTargetUserIds(postId);

  for (const targetUserId of targetUserIds) {
    const notification = await getPreviousNotificationByPost(
      targetUserId,
      postId
    );

    create(
      NotificationTypes.Like,
      notification,
      targetUserId,
      sourceUserId,
      postId
    );
  }
};

const unlike = async (sourceUserId: number, postId: number) => {};

export default {
  like,
  unlike,
};
