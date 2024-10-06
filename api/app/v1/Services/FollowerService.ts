import { IoCService, RedisAdaptor } from "axe-api";
import { Knex } from "knex";
import CacheService from "./CacheService";

const getMyFollowings = async (authUserId: number) => {
  const redis = await IoCService.use<RedisAdaptor>("Redis");
  const key = CacheService.toKeys("FollowerService.getMyFollowings", {
    authUserId,
  });
  const data = await redis.get(key);
  if (data) {
    return JSON.parse(data);
  }

  const db = await IoCService.use<Knex>("Database");

  // Fetch my related likes
  const followings = await db
    .table("user_followers")
    .select("id", "user_id")
    .where("follower_id", authUserId);

  await redis.set(key, JSON.stringify(followings), 60 * 5);

  // The posts that I liked
  return followings;
};

const getMyFollowingIds = async (authUserId: number) => {
  return (await getMyFollowings(authUserId)).map((item: any) => item.user_id);
};

export default {
  getMyFollowings,
  getMyFollowingIds,
};
