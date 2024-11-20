import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { captureError } from "../Services/ErrorService";
import { Knex } from "knex";
import { getUserAvatar } from "../Services/UserService";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(404).send("The user not found");
    }

    const db = await IoCService.use<Knex>("Database");
    const item = await db.table("users").where("username", username).first();

    if (!item) {
      return res.status(404).send("The user not found");
    }

    res.status(200).json({
      bio: item.bio,
      following_id: item.following_id,
      id: item.id,
      name: item.name,
      stats_follower: item.stats_follower,
      stats_following: item.stats_following,
      username: item.username,
      avatar: getUserAvatar(item.email),
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
