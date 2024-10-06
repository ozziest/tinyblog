import { IoCService } from "axe-api";
import { Knex } from "knex";

const getMyFollowings = async (authUserId: number) => {
  const db = await IoCService.use<Knex>("Database");

  // Fetch my related likes
  const followings = await db
    .table("user_followers")
    .select("id", "user_id")
    .where("follower_id", authUserId);

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
