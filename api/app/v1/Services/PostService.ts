import { IoCService } from "axe-api";
import { Knex } from "knex";

const getMyLikedPostIds = async (userId: number, postIds: number[]) => {
  const db = await IoCService.use<Knex>("Database");

  // Fetch my related likes
  const myLikes = await db
    .table("post_likes")
    .select("post_id")
    .whereIn("post_id", postIds)
    .where("user_id", userId);

  // The posts that I liked
  return myLikes.map((item) => item.post_id).flat();
};

const getPostLike = async (userId?: number, postId?: number) => {
  const db = await IoCService.use<Knex>("Database");
  return await db
    .table("post_likes")
    .where("user_id", userId)
    .where("post_id", postId)
    .first();
};

const deletePostLike = async (postLikeId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("post_likes").where("id", postLikeId).delete();
};

const decrementPostLike = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).decrement({ stats_likes: 1 });
};

const getPostView = async (userId?: number, postId?: number) => {
  const db = await IoCService.use<Knex>("Database");
  return await db
    .table("post_views")
    .where("user_id", userId)
    .where("post_id", postId)
    .first();
};

const incrementPostReplies = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_replies: 1 });
};

const addPostView = async (userId?: number, postId?: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("post_views").insert({
    user_id: userId,
    post_id: postId,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const incrementPostView = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_views: 1 });
};

const incrementPostLike = async (postId: number) => {
  const db = await IoCService.use<Knex>("Database");
  await db.table("posts").where("id", postId).increment({ stats_likes: 1 });
};

export default {
  getMyLikedPostIds,
  getPostLike,
  deletePostLike,
  decrementPostLike,
  getPostView,
  incrementPostReplies,
  addPostView,
  incrementPostView,
  incrementPostLike,
};
