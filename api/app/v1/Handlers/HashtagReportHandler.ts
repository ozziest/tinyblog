import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import { Knex } from "knex";
import { captureError } from "../Services/ErrorService";
import { format, subHours } from "date-fns";

const REDIS_KEY = "HashtagReport";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    if (!req.original.auth) {
      return res.status(404).json({ error: "The user not found!" });
    }
    const db = (await IoCService.use("Database")) as Knex;
    const redis = await IoCService.use<RedisAdaptor>("Redis");

    const data = await redis.get(REDIS_KEY);
    if (data) {
      return res.status(200).json(JSON.parse(data));
    }

    const last24Hours = format(subHours(new Date(), 24), "yyyy-MM-dd HH:mm");

    const tops = await db
      .table("post_hashtags")
      .select("hashtag_id", db.raw("COUNT(*) as total"))
      .where("created_at", ">=", last24Hours)
      .groupBy("hashtag_id")
      .orderBy("total", "desc");

    const topIds = tops.splice(0, 5).map((item) => item.hashtag_id);

    const hashtags = await db.table("hashtags").whereIn("id", topIds);

    const report = topIds
      .map((id) => {
        return hashtags.find((item) => item.id === id);
      })
      .filter((item) => item)
      .map((item) => item.hashtag);

    await redis.set(REDIS_KEY, JSON.stringify(report), 60 * 30);

    return res.json(report);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
