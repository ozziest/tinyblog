import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { captureError } from "../Services/ErrorService";
import { Knex } from "knex";
import { getUserAvatar } from "../Services/UserService";
import FollowerService from "../Services/FollowerService";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(404).send("The user not found");
    }

    const db = await IoCService.use<Knex>("Database");
    const query = db.table("users").where("username", username);

    if (!req.original.auth) {
      query.where("account_visibility", "public");
    }

    const item = await query.first();

    if (!item) {
      return res.status(404).send("The user not found");
    }

    let followings: any[] = [];
    if (req.original.auth) {
      followings = await FollowerService.getMyFollowings(
        req.original.auth?.userId
      );
    }

    const following = followings.find((i: any) => i.user_id === item.id);

    res.status(200).json({
      bio: item.bio,
      id: item.id,
      name: item.name,
      stats_follower: item.stats_follower,
      stats_following: item.stats_following,
      username: item.username,
      following_id: following?.id,
      avatar: getUserAvatar(item.email),
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
