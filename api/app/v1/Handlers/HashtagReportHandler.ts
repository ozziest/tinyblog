import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import { Knex } from "knex";
import { captureError } from "../Services/ErrorService";
import { format, subHours } from "date-fns";
import { SUPPORTED_LOCATIONS } from "../../consts";

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const db = (await IoCService.use("Database")) as Knex;
    const redis = await IoCService.use<RedisAdaptor>("Redis");

    // User can select different locations
    const locations = (req.query.get("locations") || "")
      .split(",")
      .filter((location) => SUPPORTED_LOCATIONS.includes(location));

    // Cache values should be stored by those location groups
    const cacheKey = `HashtagReport:${locations.join(",")}`;

    const data = await redis.get(cacheKey);
    if (data) {
      return res.status(200).json(JSON.parse(data));
    }

    const last24Hours = format(subHours(new Date(), 24), "yyyy-MM-dd HH:mm");

    const query = db
      .table("post_hashtags")
      .innerJoin("posts", "posts.id", "post_hashtags.post_id")
      .select("post_hashtags.hashtag_id", db.raw("COUNT(*) as total"))
      .where("post_hashtags.created_at", ">=", last24Hours);

    if (locations.length > 0) {
      query.whereIn("posts.location", locations);
    }

    const tops = await query
      .groupBy("post_hashtags.hashtag_id")
      .orderBy("total", "desc");

    const topIds = tops.splice(0, 5).map((item) => item.hashtag_id);

    const hashtags = await db.table("hashtags").whereIn("id", topIds);

    const report = topIds
      .map((id) => {
        return hashtags.find((item) => item.id === id);
      })
      .filter((item) => item)
      .map((item) => item.hashtag);

    await redis.set(cacheKey, JSON.stringify(report), 60 * 30);

    return res.json(report);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
