import { AxeRequest, AxeResponse, IoCService } from "axe-api";
import { Knex } from "knex";
import { getUserAvatar } from "../Services/UserService";
import { captureError } from "../Services/ErrorService";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const db = (await IoCService.use("Database")) as Knex;

    const user = await db
      .table("users")
      .where("id", req.original.auth?.userId)
      .first();

    if (!user) {
      return res.status(404).json({ error: "The user not found!" });
    }

    const locations = await db
      .table("user_feed_locations")
      .where("user_id", user.id);

    return res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      location: user.location,
      stats_post: user.stats_post,
      stats_follower: user.stats_follower,
      stats_following: user.stats_following,
      avatar: getUserAvatar(user.email),
      locations,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
